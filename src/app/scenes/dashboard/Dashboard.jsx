// Dashboard has been used to show role management and session management.
// Renders two kinds of card group based on role.
// For admin [AdminCardGroup.js](../components/AdminCardGroup/AdminCardGroup.html).
// For user [UserCardGroup.js](../components/UserCardGroup/UserCardGroup.html).
// Checking admin and user do by **isAdmin** and **isUser** props received from [Routes.jsx](../dashboard/scenes/app/routes/Routes.html).
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import AdminCardGroup from '../../components/adminCardGroup/AdminCardGroup'
import UserCardGroup from '../../components/uerCardGroup/UserCardGroup'
import { Button } from 'semantic-ui-react'
import { setRoleAction } from '../../../redux/user/UserActions'
import { makeSelectRole } from '../../../redux/user/UserSelectors'
import Security from '../../../configs/network/Security'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.userCardGroupItems = [
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
  }
  changeRole=() => {
    const { role, setRole } = this.props
    ;(role === 'USER') ? setRole('ADMIN') : setRole('USER')
  }
  changePage=() => {
    this.props.history.push('/list')
  }
  logout=() => {
    Security.logout()
  }

  render () {
    const { isAdmin, isUser } = this.props
    return <Fragment>
      {isAdmin() ? <AdminCardGroup /> : isUser() ? <UserCardGroup items={this.userCardGroupItems} /> : null}
      <Button onClick={this.changeRole}>Change Role</Button>
      <Button onClick={this.changePage}>Socket Page</Button>
      <Button onClick={this.logout}>Logout</Button>
    </Fragment>
  }
}

Dashboard.propTypes = {
  isAdmin: PropTypes.func.isRequired,
  isUser: PropTypes.func.isRequired,
  setRole: PropTypes.func,
  role: PropTypes.string,
  history: PropTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    setRole: (params) => (
      dispatch(setRoleAction(params))
    )
  }
}

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole()
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  injectIntl
)(Dashboard)
