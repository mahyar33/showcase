// Sample scene
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

class Login extends Component {
  componentDidMount () {
    this.props.setRole('USER')
  }
login=() => {
  this.props.history.push('/dashboard')
  this.props.onSubmitForm.asyncFunction('ok').then(
    resolvePayload => {

    },
    rejectPayload => {

    }
  )
}
componentWillMount () {
  this.props.onSubmitForm.unsubscribe()
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
  onSubmitForm: PropTypes.object,
  topMessage: PropTypes.string,
  setTopMessage: PropTypes.func,
  clearTopMessage: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: loginAction(),
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

export default compose(
  withConnect,
  injectIntl
)(Login)
