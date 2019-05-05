/*
It uses to implement ProgressBar.
*/

import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Percent from './Percent'

class ProgressBar extends React.Component {
  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 75
  };

  constructor (props) {
    super(props)
    this.handleProps = this.handleProps.bind(this)
    this.increment = this.increment.bind(this)
    this.state = {
      percent: props.percent
    }
  }

  componentDidMount () {
    this.handleProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    this.handleProps(nextProps)
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }

  increment () {
    let { percent } = this.state
    percent += ((Math.random() + 1) - Math.random())
    percent = percent < 99 ? percent : 99
    this.setState({
      percent
    })
  }

  handleProps (props) {
    if (props.autoIncrement && props.percent >= 0 && props.percent < 99) {
      this.interval = setInterval(this.increment, props.intervalTime)
    }

    if (props.percent >= 100) {
      this.setState({
        percent: 99.9
      }, () => {
        this.timeout = setTimeout(() => {
          this.setState({
            percent: -1
          }, () => props.updateProgress(-1))
        }, 300)
      })
    } else {
      this.setState({
        percent: props.percent
      })
    }
  }

  render () {
    const { percent } = this.state

    const isHidden = percent < 0 || percent >= 100

    const style = { width: `${(percent <= 0 ? 0 : percent)}%` }

    return (
      <Wrapper hidden={isHidden}>
        <Percent style={style} />
      </Wrapper>
    )
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  autoIncrement: PropTypes.bool,// eslint-disable-line
  intervalTime: PropTypes.number,// eslint-disable-line
}

export default ProgressBar
