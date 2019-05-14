// Sample scene
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import { Button, Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
const items = [
  {
    header: 'Project Report - April',
    description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%'
  },
  {
    header: 'Project Report - May',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%'
  },
  {
    header: 'Project Report - June',
    description:
        'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%'
  }
]
class Dashboard extends Component {
  componentDidMount () {
    console.log('Dashboard')

  }

  componentWillMount () {

  }

  render () {
    return this.props.isAdmin() ? <Card.Group>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                        Approve
            </Button>
            <Button basic color='red'>
                        Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
          <Card.Header>Molly Thomas</Card.Header>
          <Card.Meta>New User</Card.Meta>
          <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                        Approve
            </Button>
            <Button basic color='red'>
                        Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
          <Card.Header>Jenny Lawrence</Card.Header>
          <Card.Meta>New User</Card.Meta>
          <Card.Description>Jenny requested permission to view your contact details</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                        Approve
            </Button>
            <Button basic color='red'>
                        Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group> : this.props.isUser() ? <Card.Group items={items} /> : null
  }
}

Dashboard.propTypes = {
  isAdmin: PropTypes.func.isRequired,
  isUser: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = createStructuredSelector({

})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  injectIntl
)(Dashboard)
