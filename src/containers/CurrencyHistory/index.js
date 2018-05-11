import model from './model';

import CurrencyTimeline from 'views/CurrencyTimeline';
import CurrencyHeader from 'views/CurrencyHeader';

class CurrenciesHistory extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.currency !== this.props.currency) {
      this.fetchData();
    }
  }

  fetchData() {
    const { model, actions, currency } = this.props;

    const data = model.data[currency];
    const { fetchData } = actions;

    if (!data) {
      fetchData(currency);
    }
  }

  render() {
    const { currency, currencies, changeCurrency } = this.props;
    const data = this.props.model.data[currency];
    const error = this.props.model.errors[currency];

    return <CurrencyTimeline
      entries={data}
      error={error}
      currency={{ value: currency, items: currencies, onChange: changeCurrency }}
    />;
  }
}

// The way to connect when only local model needs to be connected,
// and not any global ones:
// export default model.connect()(CurrenciesHistory);

export default model.connectWith(
  (state) => ({
    currency: state.global.currency,
    currencies: state.global.currencies,
  }),
  (dispatch) => ({ changeCurrency: dispatch.global.changeCurrency })
)(CurrenciesHistory);

// model.connectWith() desugars into this:

// import { connect } from 'react-redux';
// export default connect(
//   (state) => {
//     return {
//       model: state[model.name],
//       currency: state.global.currency,
//       currencies: state.global.currencies,
//     };
//   },
//   (dispatch) => {
//     return {
//       actions: dispatch[mode.name],
//       changeCurrency: dispatch.global.changeCurrency
//     };
//   }
// )(CurrenciesHistory);
