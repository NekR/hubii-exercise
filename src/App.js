import { Provider } from 'react-redux';
import store from 'store';

import 'styles/app.css?global';

import History from 'pages/History';

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <History />
    </Provider>;
  }
}

/*BITSTAMP_SPOT_BTC_USD
GET /v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=5YRS

fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=1DAY', {
  mode: 'cors',
  headers: { 'X-CoinAPI-Key': '17C2C3D9-B6BA-48CF-B091-85CC61A66A6D' }
})*/