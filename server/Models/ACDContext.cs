using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class ACDContext : DbContext
    {
        public ACDContext(DbContextOptions<ACDContext> options) : base(options)
        {
        }

        public DbSet<Opskpi> Opskpis { get; set; }
        public DbSet<AgentPerformance> AgentPerformances { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<AgentACD> AgentACDs { get; set; }
        public DbSet<ContactTypeACD> ContactTypeACDs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Team>().ToTable("Team");
            modelBuilder.Entity<ContactTypeACD>().HasNoKey();
        }
    }
}
