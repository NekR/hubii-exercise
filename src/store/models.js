export const global = {
  state: {
    currency: 'BTC',
    currencies: ['BTC', 'ETH'],
  },
  reducers: {
    changeCurrency(state, currency) {
      return { ...state, currency };
    },
  },
};
