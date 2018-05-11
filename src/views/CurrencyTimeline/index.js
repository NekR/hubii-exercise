import { Box, Header, Entries, Footer, Message } from './style.css';
import Entry from './Entry';

import Switch from 'views/Switch';

export default class Timeline extends Component {
  onEntriesRef = (ref) => {
    if (ref) {
      ref.scrollLeft = ref.scrollWidth;
    }
  }

  render() {
    let { entries, error, currency } = this.props;
    let lowest = Infinity;
    let highest = -Infinity;

    const HeaderElement = <Header>
      <Switch
        items={currency.items.map(currency => ({ text: currency, value: currency }))}
        value={currency.value}
        onChange={currency.onChange}
      />
    </Header>;

    if (!entries) {
      return <Box>
        {HeaderElement}
        {error ? <Message>Something went wrong</Message> : <Message>Loading...</Message>}
      </Box>;
    }

    entries.forEach(({ price_high }) => {
      if (price_high > highest) {
        highest = price_high;
      }

      if (price_high < lowest) {
        lowest = price_high;
      }
    });

    return <Box>
      {HeaderElement}
      <Entries innerRef={this.onEntriesRef}>
        {entries.map(entry => {
          return <Entry key={currency + entry.time_period_start} entry={entry} lowest={lowest} highest={highest} />;
        })}
      </Entries>
      <Footer>
        Showing highest {currency.value}/USD transactions in latest 100 days
      </Footer>
    </Box>;
  }
}
