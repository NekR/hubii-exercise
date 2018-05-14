import { addModel } from 'store';

export default addModel({
  state: {
    currency: 'BTC',
    currencies: ['BTC', 'ETH'],
  },
  reducers: {
    changeCurrency(state, currency) {
      return { ...state, currency };
    },
  },
});
