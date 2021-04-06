using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Extensions
{
    public static class DependenciesRegistration
    {
        public static IServiceCollection AddMappers(this IServiceCollection services)
        {
            services
                .AddSingleton<IEventMapper, EventMapper>()
                .AddSingleton<IVendorMapper, VendorMapper>()
                .AddSingleton<IVendorTaskMapper, VendorTaskMapper>();
            

            return services;
        } 

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services
                .AddScoped<IEventService, EventService>()
                .AddScoped<IVendorService, VendorService>()
                .AddScoped<IVendorTaskService, VendorTaskService>();

            return services;
        }

        public static IMvcBuilder AddValidation(this IMvcBuilder builder)
        {
            builder
                .AddFluentValidation(configuration =>
                    configuration.RegisterValidatorsFromAssembly
                        (Assembly.GetExecutingAssembly()));

            return builder;
        }
        
    }
}
