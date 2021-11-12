using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class ContactType
    {
        [Key]
        public string AgentLogin { get; set; }

        public string Channels { get; set; }

    }
}
