// Sample scene
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'

class Test extends Component {
  componentDidMount () {
    console.log('store', this.context.store)
  }

  render () {
    return <div>ok</div>
  }
}

Test.propTypes = {}

export function mapDispatchToProps (dispatch) {
  return {
    onSubmitForm: (evt) => {

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
)(Test)
