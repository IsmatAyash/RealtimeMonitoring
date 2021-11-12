import Navbar from './components/Navbar';
import {
  Grid,
  Container,
  Segment,
  Dimmer,
  Loader,
  Image,
} from 'semantic-ui-react';
import Agents from './components/Agents';
import GrandTotals from './components/GrandTotals';
import { getRtm } from './services/rtmservice';
import { useState, useEffect } from 'react';
import paragraph from './images/paragraph.png';

const teams = [
  { id: 1, name: 'All', icon: 'group' },
  { id: 2, name: 'A-Gents', icon: 'adn' },
  {
    id: 4,
    name: 'PionEars',
    icon: 'assistive listening systems',
  },
  {
    id: 3,
    name: 'WeBound',
    icon: 'american sign language interpreting',
  },
];

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async loading => {
    setIsLoading(loading);
    if (!loading) setReqLoading(true);
    const { data: rtm } = await getRtm();
    setData(rtm);
    setIsLoading(false);
    setReqLoading(false);
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleSearch = agentToSearch => setSearchQuery(agentToSearch);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const getFilteredData = () => {
    if (searchQuery)
      return data.filter(d =>
        d.agentName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return activeItem !== 'All'
      ? data.filter(d => d.teamName === activeItem)
      : data;
  };

  const filtered = getFilteredData();

  return (
    <>
      <Navbar
        activeItem={activeItem}
        onRefresh={() => fetchData(false)}
        reqLoading={reqLoading}
        onSearch={handleSearch}
        teams={teams}
        onItemClick={handleItemClick}
      />
      <GrandTotals data={data} loading={isLoading} />
      <Container fluid style={{ padding: 5 }}>
        <Grid stackable columns={1}>
          <Grid.Column width={16}>
            {isLoading ? (
              <Segment>
                <Dimmer active>
                  <Loader size='large'>Loading</Loader>
                </Dimmer>
                <Image fluid src={paragraph} />
              </Segment>
            ) : (
              <Agents teamData={filtered} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default App;
