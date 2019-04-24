/*
This class is a [HOC](https://reactjs.org/docs/higher-order-components.html) which add progressbar to app.
*/
import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

function withProgressBar(WrappedComponent) {
  class AppWithProgressBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        progress: -1,
        loadedRoutes: props.location && [props.location.pathname],
      };
      this.updateProgress = this.updateProgress.bind(this);
    }

    componentWillMount() {
      // Store a reference to the listener.
      /* istanbul ignore next */
      const { router } = this.props;
      const { loadedRoutes } = this.state;
      this.unsubscribeHistory = router && router.listenBefore((location) => {
        // Do not show progress bar for already loaded routes.
        if (loadedRoutes.indexOf(location.pathname) === -1) {
          this.updateProgress(0);
        }
      });
    }

    componentWillUpdate(newProps, newState) {
      const { loadedRoutes, progress } = this.state;
      const { pathname } = newProps.location;
      // Complete progress when route changes. But prevent state update while re-rendering.
      if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && newState.progress < 100) {
        this.updateProgress(100);
        this.setState({// eslint-disable-line
          loadedRoutes: pathname,
        });
      }
    }

    componentWillUnmount() {
      // Unset unsubscribeHistory since it won't be garbage-collected.
      this.unsubscribeHistory = undefined;
    }

    updateProgress(progress) {
      this.setState({ progress });
    }

    render() {
      const { progress } = this.state;
      return (
        <div>
          <ProgressBar
            percent={progress}
            updateProgress={this.updateProgress}
          />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  AppWithProgressBar.propTypes = {
    location: PropTypes.objectOf(PropTypes.object).isRequired,
    router: PropTypes.objectOf(PropTypes.object).isRequired,
  };

  return AppWithProgressBar;
}

export default withProgressBar;
