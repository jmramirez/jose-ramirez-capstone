using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using PartyAgile.API.Extensions;
using PartyAgile.API.Hubs;
using PartyAgile.Domain.Extensions;
using PartyAgile.Domain.Repositories;
using PartyAgile.Infrastructure.Extensions;
using PartyAgile.Infrastructure.Repositories;

namespace PartyAgile.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPADbContext(Configuration.GetSection("DataSource:ConnectionString").Value);
            services.AddScoped<ICommentRepository,CommentRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IVendorTaskRepository, VendorTaskRepository>();
            services.AddScoped<IVendorRepository, VendorRepository>();
            services.AddScoped<IVendorEventRepository, VendorEventRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddTokenAuthentication(Configuration);
            services.AddMappers();
            services.AddServices();
            services.AddControllers().AddValidation();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PartyAgile.API", Version = "v1" });
            });
            
            services.AddHttpClient();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
            });
            services.AddSignalR();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.IsProduction())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PartyAgile.API v1"));
            }

            app.UseCors(cfg =>
            {
                cfg.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
            });

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MessagesHub>("/messageshub");
            });
        }
    }
}
