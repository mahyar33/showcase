// Simple Table just shows one cell per row.<br />
// Receives `title` and `items` as a props and shows title as a table header and items as a table cell.<br />

import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const SimpleTable = (props) => {
  const { items, title } = props
  if (items && items.length > 0) {
    return <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{title}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          items.map((item, key) => {
            return <Table.Row key={key}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          })
        }
      </Table.Body>
    </Table>
  } else {
    return null
  }
}

SimpleTable.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string
}
export default SimpleTable
