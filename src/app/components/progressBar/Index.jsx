// This class is a [HOC](https://reactjs.org/docs/higher-order-components.html) which add progressbar to app and Do not show progress bar for already loaded routes.

import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

function withProgressBar (WrappedComponent) {
  class AppWithProgressBar extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        progress: -1,
        loadedRoutes: props.location && [props.location.pathname]
      }
      this.updateProgress = this.updateProgress.bind(this)
    }

    componentWillMount () {
      const { router } = this.props
      const { loadedRoutes } = this.state
      this.unsubscribeHistory = router && router.listenBefore((location) => {

        if (loadedRoutes.indexOf(location.pathname) === -1) {
          this.updateProgress(0)
        }
      })
    }

    componentWillUpdate (newProps, newState) {
      const { loadedRoutes, progress } = this.state
      const { pathname } = newProps.location
      if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && newState.progress < 100) {
        this.updateProgress(100)
        this.setState({// eslint-disable-line
          loadedRoutes: pathname
        })
      }
    }

    componentWillUnmount () {
      this.unsubscribeHistory = undefined
    }

    updateProgress (progress) {
      this.setState({ progress })
    }

    render () {
      const { progress } = this.state
      return (
        <div>
          <ProgressBar
            percent={progress}
            updateProgress={this.updateProgress}
          />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }

  AppWithProgressBar.propTypes = {
    location: PropTypes.objectOf(PropTypes.object).isRequired,
    router: PropTypes.objectOf(PropTypes.object).isRequired
  }

  return AppWithProgressBar
}

export default withProgressBar
