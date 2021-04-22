using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PartyAgile.Domain.Configurations;
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
    }

    public class UserService : IUserService
    {
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IOptions<AuthenticationSettings> authenticationSettings)
        {
            _userRepository = userRepository;
            _authenticationSettings = authenticationSettings.Value;
        }

        public async Task<UserResponse> GetUserAsync(GetUserRequest request, CancellationToken cancellationToken)
        {
            var response = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);

            var vendorId = response.VendorId.CompareTo(Guid.Parse("00000000-0000-0000-0000-000000000000"));

            var role = "";

            if(vendorId == 1)
            {
                role = "Vendor";
            }

            if(vendorId == 0)
            {
                role = "Planer";
            }

            return new UserResponse { Id = response.Id, Name = $"{response.FirstName} {response.LastName}", Email = response.Email, VendorId = response.VendorId, Role = role };
        }

        public async Task<UserResponse> SignUpAsync(SignUpRequest request, CancellationToken cancellationToken)
        {
            var user = new Entities.AppUser { Email = request.Email, UserName = request.Email, FirstName = request.FirstName, LastName = request.LastName };
            bool isCreated = await _userRepository.SignUpAsync(user, request.Password, cancellationToken);

            return !isCreated ? null : new UserResponse { Name = $"{request.FirstName} {request.LastName}", Email = request.Email };
        }
        

        public async Task<TokenResponse> SignInAsync(SignInRequest request, CancellationToken cancellationToken)
        {
            bool isAuthenticated = await _userRepository.AuthenticateAsync(request.Email, request.Password, cancellationToken);

            return !isAuthenticated ? null : new TokenResponse { Token = GenerateSecurityToken(request) };
        }

        private string GenerateSecurityToken(SignInRequest request)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_authenticationSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Role, "Planer")
                }),
                
                

                Expires = DateTime.UtcNow.AddDays(_authenticationSettings.ExpirationDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

           

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
