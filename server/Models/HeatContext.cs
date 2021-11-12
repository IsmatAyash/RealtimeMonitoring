using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class HeatContext : DbContext
    {
        public HeatContext(DbContextOptions<HeatContext> options) : base(options)
        {
        }

        public DbSet<Journal> Journals { get; set; }
        public DbSet<AgentRegistry> AgentRegistries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Journal>().ToTable("Journal");
        }


    }

}