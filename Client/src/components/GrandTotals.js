import React from 'react';
import { Icon, Loader, Segment, Header, Grid, List } from 'semantic-ui-react';
import { kpiTot, formatSec } from '../utils/helper';

const tots = [
  {
    agg: 'count',
    key: 'agentName',
    label: 'Active Users',
    value: '',
    icon: 'user circle',
    unit: 'users',
  },
  {
    agg: 'sum',
    key: 'callsOff',
    label: 'Offered',
    value: '',
    icon: 'viber',
    unit: 'calls',
  },
  {
    agg: 'sum',
    key: 'callsAns',
    label: 'Answered',
    value: '',
    icon: 'headphones',
    unit: 'calls',
  },
  {
    agg: 'avg',
    key: 'aht',
    label: 'AHT',
    value: '',
    icon: 'retweet',
    fmtSec: true,
  },
  {
    agg: 'avg',
    key: 'acw',
    label: 'ACW',
    value: '',
    icon: 'save',
    fmtSec: true,
  },
  {
    agg: 'avg',
    key: 'avgRingTime',
    label: 'Average Delay',
    value: '',
    icon: 'tachometer alternate',
    unit: 'seconds',
  },
  {
    agg: 'sum',
    key: 'registered',
    label: 'Registry',
    value: '',
    icon: 'percent',
    unit: '%',
  },
  {
    agg: 'sum',
    key: 'timedOut',
    label: 'Timed Out',
    value: '',
    icon: 'hourglass end',
    unit: 'calls',
  },
  {
    agg: 'sum',
    key: 'intended',
    label: 'Intended',
    value: '',
    icon: 'cut',
    unit: 'calls',
  },
];

const GrandTotals = ({ data, loading }) => {
  const loader = () => <Loader active inline />;

  tots.forEach(r => (r.value = kpiTot(r.agg, r.key, data)));
  tots[6].value = Math.round((tots[6].value / tots[2].value) * 100, 0) || 0;

  return (
    <Segment basic>
      <Grid columns='nine' stackable>
        {tots.map(tot => (
          <Grid.Column key={tot.key}>
            <Header as='h5'>
              <Icon name={tot.icon} />
              <Header.Content>
                {tot.label}
                <Header.Subheader>
                  {loading
                    ? loader()
                    : tot.fmtSec
                    ? formatSec(tot.value)
                    : Math.round(tot.value, 0).toLocaleString()}{' '}
                  {tot.unit}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

export default GrandTotals;
