﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RealtimeMonitoring.Models
{
    public class AgentPerformance
    {
        [Key]
        public string AgentLogin { get; set; }
        public string AgentName { get; set; }
        public int CallsAns { get; set; }
        public int CallsOff { get; set; }
        public int Intended { get; set; }
        public int TimedOut { get; set; }
        public int AvgRingTime { get; set; }
        public int AHT { get; set; }
        public int RNR { get; set; }
        public int TalkTime { get; set; }
        public int ACW { get; set; }
        public int ACWCount { get; set; }
        public int Registered { get; set; }
        public string Channels { get; set; } 
        public string TeamName { get; set; }
    }
}
