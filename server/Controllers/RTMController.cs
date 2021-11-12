using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealtimeMonitoring.Models;

namespace RealtimeMonitoring.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RTMController : ControllerBase
    {
        private readonly ACDContext actx;
        private readonly HeatContext  hctx;

        public RTMController(ACDContext context, HeatContext heatctx)
        {
            actx = context;
            hctx = heatctx;
        }

        // GET: api/RTM
        [HttpGet]
        public IList<AgentPerformance> GetKPIs()
        {
            string[] cats = new string[] { "Call In", "Email In", "Social Media", "B-Smart", "Web Chat" };
            string KPIsql = "SELECT AgentLogin, SUM(X.LoggedInTime) as LoginTime, SUM(X.ACWTime) as ACW, SUM(distinct X.RealNR) as RNR, "
                   + "SUM(X.TalkTime) as TalkTime, SUM(X.CallsReturnedToQ) as Intended, SUM(X.CallsReturnedToQDueToTimeout) as TimedOut, "
                   + "SUM(X.CallsAnswered) as CallsAns, SUM(X.CallsOffered) as CallsOff, ISNULL(AVG(AvgRT),0) as AvgRingTime, SUM(distinct X.ACWC) as ACWCount "
                   + "FROM "
                   + "(SELECT AgentLogin, (RingTime / NULLIF(CallsAnswered,0)) as AvgRT, LoggedInTime, PostCallProcessingTime AS ACWTime, "
                   + "(SELECT  ISNULL(SUM(ActivityTime), 0) AS Expr1 FROM AACC..dbo.iActivityCodeStat AS D "
                   + "WHERE (cast(Timestamp as date) = cast(getdate() as date)) AND (A.AgentLogin = AgentLogin) AND (ActivityCode IN('01', '02', '03', '05', '000'))) AS RealNR, "
                   + "TalkTime, CallsReturnedToQ, CallsReturnedToQDueToTimeout, CallsAnswered, CallsOffered, "
                   + "(SELECT  ISNULL(COUNT(*), 0) AS Expr1 FROM AACC..dbo.iActivityCodeStat AS E "
                   + "WHERE (cast(Timestamp as date) = cast(getdate() as date)) AND (A.AgentLogin = AgentLogin) AND (ActivityCode = '00000')) AS ACWC "
                   + "FROM  AACC..dbo.iAgentPerformanceStat AS A "
                   + "WHERE (LoggedInTime <> 0) and (cast(Timestamp as date) = cast(getdate() as date))) X "
                   + "GROUP BY AgentLogin";

            string regSql = "SELECT CreatedBy as HeatUser, COUNT(*) as Registry "
               + "FROM dbo.Journal "
               + "WHERE cast((CreatedDateTime + GETDATE() - GETUTCDATE()) as date) = CAST(GETDATE() as date) and "
               + "Category in ('Call In','Email In','Social Media','B-Smart','Web Chat') "
               + "GROUP BY CreatedBy";

            var kpis = actx.Opskpis.FromSqlRaw(KPIsql).ToList();
            List<ContactType> cts = ConcatCh();
            var regs = hctx.Journals.FromSqlRaw(regSql).ToList();

            return (from k in kpis
                    join c in cts on k.AgentLogin equals c.AgentLogin
                    join e in actx.Employees on c.AgentLogin equals e.AgentLogin
                    join t in actx.Teams on e.TeamID equals t.TeamID
                    join h in regs on e.CRMUser.ToUpper() equals h.HeatUser.ToUpper()
                    select new AgentPerformance
                     {
                         AgentLogin = k.AgentLogin,
                         AgentName = e.FirstName + " " + e.LastName,
                         CallsAns = k.CallsAns,
                         CallsOff = k.CallsOff,
                         Registered = h.Registry,
                         AvgRingTime = k.AvgRingTime,
                         TimedOut = k.TimedOut,
                         Intended = k.Intended,
                         RNR = k.RNR,
                         TalkTime = k.TalkTime,
                         AHT = (k.CallsAns == 0 ? 0 : k.TalkTime) / (k.CallsAns != 0 ? k.CallsAns : 1),
                         ACW = k.ACW,
                         ACWCount = k.ACWCount,
                         Channels = c.Channels,
                         TeamName = t.TeamName
                     }).ToList();
        }

        private List<ContactType> ConcatCh()
        {
            string AAsql = "Select UserID, TelsetLoginID "
                            + "from AACC..[dbo].[Agent] ";
            string CTsql = "Select UserID, ContactType "
                            + "from AACC..[dbo].[AgentCap]";

            var CT = actx.ContactTypeACDs.FromSqlRaw(CTsql).ToArray();
            var AA = actx.AgentACDs.FromSqlRaw(AAsql).ToArray();
            return (from ag in AA
                    join cc in CT on ag.UserID equals cc.UserID
                    group cc by ag into gg
                    select new ContactType()
                    {
                        AgentLogin = gg.Key.TelsetLoginID,
                        Channels = string.Join(",", gg.Select(x => x.ContactType.Substring(0, 1)))
                    }).ToList();
        }
            
    }
}