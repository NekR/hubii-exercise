import { init } from '@rematch/core';
import { connect } from 'react-redux';

import * as models from './models';

const store = init({ models });

export default store;

let namesId = 0;

export function addModel({ state, reducers, effects, name }) {
  if (!name) {
    name = 'model' + namesId++;
  }

  store.model({
    state, reducers, effects, name
  });

  // const model = store.dispatch[name];
  const mapDispatch = (dispatch) => ({ actions: dispatch[name] });
  const mapState = (state) => ({ model: state[name] });

  return {
    name: name,
    // Might be exposed, but ideally shouldn't
    // model: model,
    connect: () => {
      return connect(mapState, mapDispatch);
    },

    connectWith: (stateToProps, dispatchToProps) => {
      return connect(wrapMapFn((state, ownProps) => {
        return {
          ...mapState(state),
          ...stateToProps(state, ownProps),
        };
      }), wrapMapFn((dispatch, ownProps) => {
        return {
          ...mapDispatch(dispatch),
          ...dispatchToProps(dispatch, ownProps)
        };
      }))
    },
  };
}

function wrapMapFn(fn) {
  if (fn.length <= 1) {
    return (thing) => fn(thing);
  } else {
    return (thing, ownProps) => fn(thing, ownProps);
  }
}