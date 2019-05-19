// Sample scene
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import AdminCardGroup from '../../components/AdminCardGroup/AdminCardGroup'
import UserCardGroup from '../../components/UserCardGroup/UserCardGroup'
import { Button } from 'semantic-ui-react'
import { setRoleAction } from '../../../redux/user/UserActions'
import { makeSelectRole } from '../../../redux/user/UserSelectors'
import Security from '../../../configs/network/Security'

class Dashboard extends Component {
  changeRole=() => {
    (this.props.role === 'USER') ? this.props.setRole('ADMIN') : this.props.setRole('USER')
  }
  changePage=() => {
    this.props.history.push('/list')
  }
  logout=() => {
    Security.logout()
  }

  render () {
    return <Fragment>
      {this.props.isAdmin() ? <AdminCardGroup /> : this.props.isUser() ? <UserCardGroup /> : null}
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
