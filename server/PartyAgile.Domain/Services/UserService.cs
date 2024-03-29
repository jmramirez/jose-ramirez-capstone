﻿using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PartyAgile.Domain.Configurations;
using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.User;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Services
{
    public interface IUserService
    {
        Task<UserResponse> GetUserAsync(GetUserRequest request, CancellationToken cancellationToken = default);
        Task<UserResponse> SignUpAsync(SignUpRequest request, CancellationToken cancellationToken = default);
        Task<TokenResponse> SignInAsync(SignInRequest request, CancellationToken cancellationToken = default);
        Task<IEnumerable<EventResponse>> GetEventsByUserId(GetUserRequest request, string timing);
    }

    public class UserService : IUserService
    {
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserRepository _userRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IEventMapper _eventMapper;
        private readonly IVendorRepository _vendorRepository;
        private readonly IVendorMapper _vendorMapper;

        public UserService(IUserRepository userRepository, IOptions<AuthenticationSettings> authenticationSettings, IEventRepository eventRepository, IEventMapper eventMapper, IVendorRepository vendorRepository, IVendorMapper vendorMapper)
        {
            _userRepository = userRepository;
            _authenticationSettings = authenticationSettings.Value;
            _eventMapper = eventMapper;
            _eventRepository = eventRepository;
            _vendorRepository = vendorRepository;
            _vendorMapper = vendorMapper;
        }

        public async Task<UserResponse> GetUserAsync(GetUserRequest request, CancellationToken cancellationToken)
        {
            var response = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);

            if (response == null) return null;

            var roles = await _userRepository.GetRoles(request.Email);
            var role = roles.First();
            var vendor = new VendorResponse();
            var name = $"{response.FirstName} {response.LastName}";

            if(role == "Vendor")
            {
                var userVendor = await _vendorRepository.GetByUserId(response.Id);
                vendor.Id = userVendor.Id;
                vendor.Name = userVendor.Name;
                vendor.Type = userVendor.Type;
                name = userVendor.Name;
            }

            return new UserResponse { Id = response.Id, Name = name, Email = response.Email, Role = role, Vendor = vendor };
        }

        public async Task<UserResponse> SignUpAsync(SignUpRequest request, CancellationToken cancellationToken)
        {
            var user = new Entities.AppUser { Email = request.Email, UserName = request.Email, FirstName = request.FirstName, LastName = request.LastName };
            bool isCreated = await _userRepository.SignUpAsync(user, request.Password, "Planner", cancellationToken);

            return !isCreated ? null : new UserResponse { Name = $"{request.FirstName} {request.LastName}", Email = request.Email };
        }
        

        public async Task<TokenResponse> SignInAsync(SignInRequest request, CancellationToken cancellationToken)
        {
            bool isAuthenticated = await _userRepository.AuthenticateAsync(request.Email, request.Password, cancellationToken);

            if (!isAuthenticated) return null;

            var role = await _userRepository.GetRoles(request.Email, cancellationToken);

            return new TokenResponse { Token = GenerateSecurityToken(request, role.First()) };
        }

        public async Task<IEnumerable<EventResponse>> GetEventsByUserId(GetUserRequest request, string timing)
        {
            if (request == null) throw new ArgumentNullException();
            var user = await _userRepository.GetByEmailAsync(request.Email);
            var result = await _eventRepository.GetEventsByUserIdAsync(user.Id,timing);
            return result.Select(x => _eventMapper.Map(x));
        }

        private string GenerateSecurityToken(SignInRequest request, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_authenticationSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Name, request.Email),
                    new Claim(ClaimTypes.Role, role)
                }),

                Expires = DateTime.UtcNow.AddDays(_authenticationSettings.ExpirationDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

           

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
