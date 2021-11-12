import React from 'react';
import { Table } from 'semantic-ui-react';
import TableCell from './TableCell';
import { formatSec, kpiTot } from '../utils/helper';

const ths = [
  { id: 1, name: 'Name' },
  { id: 2, name: 'Team' },
  { id: 3, name: 'Channels' },
  { id: 4, name: 'AHT' },
  { id: 5, name: 'Answered' },
  { id: 6, name: 'Registered' },
  { id: 7, name: 'ACW' },
  { id: 8, name: 'ACWCount' },
  { id: 9, name: 'Real NR' },
  { id: 10, name: 'Intended' },
  { id: 11, name: 'Timed Out' },
  { id: 12, name: 'Avg. Delay' },
];

let totals = [
  { agg: 'count', name: 'agentName', amount: '', unit: 'users' },
  { agg: 'none', name: '01', amount: '' },
  { agg: 'none', name: '02', amount: '' },
  { agg: 'avg', name: 'aht', amount: '' },
  { agg: 'sum', name: 'callsAns', amount: '', unit: 'calls' },
  { agg: 'sum', name: 'registered', amount: '', unit: 'calls' },
  { agg: 'none', name: '06', amount: '' },
  { agg: 'sum', name: 'acwCount', amount: '', unit: 'calls' },
  { agg: 'none', name: '08', amount: '' },
  { agg: 'sum', name: 'intended', amount: '', unit: 'calls' },
  { agg: 'sum', name: 'timedOut', amount: '', unit: 'calls' },
  { agg: 'avg', name: 'avgRingTime', amount: '', unit: 'seconds' },
];

const Agents = ({ teamData }) => {
  totals.forEach(r => (r.amount = kpiTot(r.agg, r.name, teamData)));

  return (
    <Table size='small' color='green' compact>
      <Table.Header>
        <Table.Row textAlign='center'>
          {ths.map(th => (
            <Table.HeaderCell key={th.id}>{th.name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {teamData.map(dd => (
          <Table.Row textAlign='center' key={dd.agentLogin}>
            <TableCell textAlign='left' val1={dd.agentName} />
            <TableCell val1={dd.teamName} />
            <TableCell val1={dd.channels} />
            <TableCell kpi='aht' val1={dd.aht} fmtSec />
            <TableCell val1={dd.callsAns} />
            <TableCell
              att
              kpi='reg'
              val1={dd.registered}
              ch={dd.channels}
              val2={dd.callsAns}
            />
            <TableCell kpi='acw' val1={dd.acw} val2={dd.callsAns} fmtSec />
            <TableCell val1={dd.acwCount} />
            <TableCell kpi='rnr' val1={dd.rnr} fmtSec />
            <TableCell kpi='zero' val1={dd.intended} att />
            <TableCell kpi='zero' val1={dd.timedOut} att />
            <TableCell kpi='avd' ch={dd.channels} val1={dd.avgRingTime} />
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row textAlign='center'>
          {totals.map(tot => (
            <Table.HeaderCell key={tot.name}>
              <h5>
                {tot.name === 'aht'
                  ? formatSec(tot.amount)
                  : Math.round(tot.amount, 0).toLocaleString()}{' '}
                {tot.unit}
              </h5>
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default Agents;
