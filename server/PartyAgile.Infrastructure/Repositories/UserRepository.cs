using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public UserRepository(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> AuthenticateAsync(string email, string password, CancellationToken cancellationToken)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, false, false);
            return result.Succeeded;
        }

        public async Task<bool> SignUpAsync(AppUser user, string password, CancellationToken cancellation)
        {
            var result = await _userManager.CreateAsync(user, password);
            await _userManager.AddToRoleAsync(user, "Planner");
            return result.Succeeded;
        }

        public async Task<AppUser> GetByEmailAsync(string requestEmail, CancellationToken cancellationToken)
        {
            
            return await _userManager
                .Users
                .FirstOrDefaultAsync(u => u.Email == requestEmail, cancellationToken);
        }

        public async Task<IList<string>> GetRoles(string requestEmail, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == requestEmail, cancellationToken);
            return await _userManager.GetRolesAsync(user);
        }

        private void AddRoles()
        {
            if(_roleManager.RoleExistsAsync("Planer").GetAwaiter().GetResult() == false)
            {
                _roleManager.CreateAsync(new AppRole("Planer")).GetAwaiter().GetResult();
            }

            if (_roleManager.RoleExistsAsync("Vendor").GetAwaiter().GetResult() == false)
            {
                _roleManager.CreateAsync(new AppRole("Vendor")).GetAwaiter().GetResult();
            }
        }
    }
}
