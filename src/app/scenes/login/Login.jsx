// Simulates login operation by setting role in componentDidMount react lifecycle.<br />
// Including button that call an action and stimulates related saga to set sessions and handle logic.<br />
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import { Button, Card, Form, Grid, Header, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { loginAction, setRoleAction } from '../../../redux/user/UserActions'
import { makeSelectSession } from '../../../redux/user/UserSelectors'
import { makeSelectTopMessage } from '../../../redux/global/GlobalSelectors'
import { clearTopMessageAction, setTopMessageAction } from '../../../redux/global/GlobalActions'
import { LOGIN } from '../../../redux/user/UserConstants'
import withEmitter from '../../components/withEmitter/withEmitter'

class Login extends Component {
  componentDidMount () {
    this.props.setRole('USER')
  }

  login=() => {
    const { login, history } = this.props
    login()
    history.push('/dashboard')
  }
  componentWillUnmount () {

  }
  render () {
    const { topMessage } = this.props
    return <Grid centered>
      {topMessage ? <Grid.Row>
        <Grid.Column width={16}>
          <Message info>
            <p>{topMessage}</p>
          </Message>
        </Grid.Column>
      </Grid.Row> : null}
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h2'>Login</Header>
          <Card fluid>
            <Card.Content>
              <Form onSubmit={this.login}>
                <Form.Group widths='equal'>
                  <Form.Input label='First name' placeholder='First name' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input type={'password'} label='Password' placeholder='Password' />
                </Form.Group>
                <Button type='submit'>Submit</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
}

Login.propTypes = {
  login: PropTypes.func,
  topMessage: PropTypes.string,
  setTopMessage: PropTypes.func,
  setRole: PropTypes.func,
  history: PropTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => (
      dispatch(loginAction())
    ),
    setTopMessage: (params) => (
      dispatch(setTopMessageAction(params))
    ),
    clearTopMessage: (params) => (
      dispatch(clearTopMessageAction(params))
    ),
    setRole: (params) => (
      dispatch(setRoleAction(params))
    )

  }
}

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  topMessage: makeSelectTopMessage()

})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const injectEmitter = withEmitter([LOGIN])
export default compose(
  injectEmitter,
  withConnect,
  injectIntl
)(Login)
