/*
  Dynamically injects a saga, passes component's props as saga arguments which has 3 parameters:
 `key` A key of the saga,`saga` A root saga that will be injected,
  [`mode`](/constant.html) By default (constants.DAEMON) the saga will be started.
 */
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

export default ({ key, saga, mode }) => (WrappedComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withSaga(${WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'})`;

    constructor(props, context) {
      super(props, context);
      const { store } = context;
      this.injectors = getInjectors(store);
      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
