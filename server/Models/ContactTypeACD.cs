using Microsoft.Extensions.Configuration.UserSecrets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class ContactTypeACD
    {
        public string UserID { get; set; }
        public string ContactType { get; set; }
    }
}
