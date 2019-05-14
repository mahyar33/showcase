// Sample scene
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { setLocale } from '../../../redux/locale/LocaleActions'

class Temp extends Component {
  componentDidMount () {

  }

  render () {
    return <Link to='/test'><div>hi</div></Link>
  }
}

Temp.propTypes = {}

export function mapDispatchToProps (dispatch) {
  return {
    onSubmitForm: () => {
      dispatch(setLocale('de'))
    }
  }
}

const mapStateToProps = createStructuredSelector({})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  injectIntl
)(Temp)
