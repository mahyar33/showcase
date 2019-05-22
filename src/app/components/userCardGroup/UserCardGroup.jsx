// Card Group receiving an array of items with the below format and renders several cards.
// ```
// [{
//   header: 'Project Report - April',
//   description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
//   meta: 'ROI: 30%'
// },...]
// ```

import React from 'react'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const UserCardGroup = (props) => {
  const { items } = props
  return <Card.Group items={items} />
}

UserCardGroup.propTypes = {
  items: PropTypes.array
}
export default UserCardGroup
