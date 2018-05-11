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