// Shows network status.

import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const NetworkStatus = (props) => {
  const { networkStatus } = props
  if (networkStatus) {
    return <Message info>
      <p>{networkStatus}</p>
    </Message>
  } else {
    return null
  }
}

NetworkStatus.propTypes = {
  networkStatus: PropTypes.string
}
export default NetworkStatus
