import { addModel } from 'store';

export default addModel({
  state: {
    data: {},
    errors: {},
  },
  effects: {
    async fetchData(key) {
      const url = `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${key}_USD/latest?period_id=1DAY`;

      let data;
      let error;

      try {
        const res = await fetch(url, {
          mode: 'cors',
          headers: { 'X-CoinAPI-Key': COIN_API_KEY },
        });

        if (!res.ok) {
          throw res;
        }

        data = await res.json();
      } catch (e) {
        error = true;
      }

      this.setData({
        key,
        data: data && data.reverse(),
        error: error,
      });
    },
  },
  reducers: {
    setData(state, { key, data, error }) {
      return {
        errors: {
          [key]: error,
        },
        data: {
          ...state.data,
          [key]: data,
        },
      };
    },
  },
});
