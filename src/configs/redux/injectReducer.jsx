/*
  Dynamically injects a reducer which has 2 parameters:
 `key` A key of the reducer,`reducer` A reducer that will be injected.
 */
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';


export default ({ key, reducer }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withReducer(${WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'})`;

    constructor(props, context) {
      super(props, context);
      const { store } = context;
      getInjectors(store).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
