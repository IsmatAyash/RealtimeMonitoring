import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';

const CountdownTimer = ({ minutes = 0, seconds = 0, onRefresh, loading }) => {
  const [[m, s], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (m === 0 && s === 0) reset();
    else if (s === 0) setTime([m - 1, 59]);
    else setTime([m, s - 1]);
  };

  const handleRefresh = () => {
    onRefresh();
    reset();
  };

  const reset = () => {
    setTime([parseInt(minutes), parseInt(seconds)]);
    onRefresh();
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <h4>
      <Icon.Group>
        {loading ? (
          <Icon loading size='large' name='circle notch' />
        ) : (
          <Icon name='refresh' link onClick={handleRefresh} />
        )}
      </Icon.Group>
      {m}:{s < 10 ? `0${s}` : s}
    </h4>
  );
};

export default CountdownTimer;
