using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class Journal
    {
        [Key]
        public string HeatUser { get; set; }
        public int Registry { get; set; }

    }
}
