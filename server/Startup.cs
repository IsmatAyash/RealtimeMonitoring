using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using RealtimeMonitoring.Models;
using Microsoft.AspNetCore.Server.IISIntegration;

namespace RealtimeMonitoring
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200","http://rouwsrv:4050","http://localhost:3000", "http://rouwsrv:4090")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddControllers();

            services.AddDbContext<ACDContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ACDConn"),
                opt => opt.CommandTimeout(180)));

            services.AddDbContext<HeatContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("HeatConn")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
