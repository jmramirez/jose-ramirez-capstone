using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PartyAgile.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace PartyAgile.API.Extensions
{
    public static class DatabaseExtensions
    {
        public static IServiceCollection AddPADbContext(this IServiceCollection services, string connectionString)
        {
            return services
                .AddDbContext<PartyAgileDbContext>(opt =>
                {
                    opt.UseSqlServer(
                        connectionString,
                        x =>
                        {
                            x.MigrationsAssembly(typeof(Startup)
                                .GetTypeInfo()
                                .Assembly
                                .GetName().Name);
                        });
                });
        }
    }
}
