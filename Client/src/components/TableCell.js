import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { formatSec } from '../utils/helper';

const TableCell = ({ att, ch, fmtSec, kpi, val1, val2, ...rest }) => {
  const redIt = () => {
    switch (kpi) {
      case 'aht':
        return val1 > 180;
      case 'ans':
        return val1 > 1;
      case 'reg':
        return ch === 'V,E' || ch === 'E'
          ? val1 < val2 * 0.7
          : val1 < val2 * 0.9;
      case 'zero':
        return val1 > 0;
      case 'acw':
        // ACW / (85% of callsAns) > 1 minute
        return val1 / (val2 * 0.85) > 60;
      case 'acwc':
        // ACWCount > Registered
        return val1 > val2;
      case 'rnr':
        return val1 > 4860;
      case 'avd':
        return ch === 'V' && val1 > 10;
      default:
        return false;
    }
  };

  return (
    <Table.Cell error={redIt()} {...rest}>
      {redIt() && att && <Icon name='attention' />}
      {fmtSec ? formatSec(val1) : val1}
    </Table.Cell>
  );
};

export default TableCell;
