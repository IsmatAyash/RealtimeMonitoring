import React, { useState } from 'react';
import { Input, Menu, Icon } from 'semantic-ui-react';
import CountdownTimer from './CountdownTimer';

const Navbar = ({
  onItemClick,
  onRefresh,
  onSearch,
  reqLoading,
  teams,
  activeItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Menu attached='top' stackable size='small' pointing inverted>
      <Menu.Item header as='h3'>
        Real Time Monitoring
      </Menu.Item>
      {teams.map(team => (
        <Menu.Item
          key={team.id}
          name={team.name}
          active={activeItem === team.name}
          onClick={onItemClick}
          color='blue'>
          <Icon name={team.icon} />
          {team.name}
        </Menu.Item>
      ))}
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input
            placeholder='Search...'
            action={{
              color: 'blue',
              icon: 'search',
              onClick: () => onSearch(searchQuery),
            }}
            defaultValue={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Menu.Item>
        <Menu.Item>
          <CountdownTimer
            minutes={30}
            seconds={0}
            onRefresh={onRefresh}
            loading={reqLoading}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
