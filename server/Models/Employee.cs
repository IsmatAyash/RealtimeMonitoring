using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class Employee
    {
        [Key]
        public string AgentLogin { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string CRMUser { get; set; }
        public string WindowsUser { get; set; }
        public int TitleID { get; set; }
        public int TeamID { get; set; }
        public string JobTitle { get; set; }
    }
}
