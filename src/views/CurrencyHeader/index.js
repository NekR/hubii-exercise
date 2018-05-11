import { Box } from './style.css';

import Switch from 'views/Switch';

export default class CurrentHeader extends Component {
  render() {
    const { currency, currencies, changeCurrency } = this.props;

    return <Box>
      <Switch
        items={currencies.map(currency => ({ text: currency, value: currency }))}
        value={currency}
        onChange={changeCurrency}
      />
    </Box>
  }
}