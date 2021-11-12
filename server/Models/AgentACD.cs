using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class AgentACD
    {
        [Key]
        public string UserID { get; set; }
        public string TelsetLoginID { get; set; }
    }
}
