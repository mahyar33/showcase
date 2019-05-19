// Sample scene
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import { Grid, Message, Table } from 'semantic-ui-react'
import { makeSelectCityList } from '../../../redux/city/CitySelectors'
import { makeSelectFemaleList } from '../../../redux/female/FemaleSelectors'
import PropTypes from 'prop-types'
import { makeSelectMaleList } from '../../../redux/male/MaleSelectors'
import withEmitter from '../../components/withEmitter/withEmitter'
import { NUMBER_LIST } from '../../../redux/number/NumberConstants'
import { numberListAction } from '../../../redux/number/NumberActions'
import { maleListAction } from '../../../redux/male/MaleActions'
import { makeSelectNetworkStatus } from '../../../redux/global/GlobalSelectors'

class List extends Component {
  componentDidMount () {
    this.props.numberList()
    this.props.maleList()
  }

  componentWillUnmount () {

  }
  createTable=(items, title) => {
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
    }
  }
  render () {
    const { networkStatus } = this.props
    return <Grid padded>
      {networkStatus ? <Grid.Row>
        <Grid.Column width={16}>
          <Message info>
            <p>{networkStatus}</p>
          </Message>
        </Grid.Column>
      </Grid.Row> : null}
      <Grid.Row columns={2}>
        <Grid.Column>
          {this.createTable(this.props.city.success, 'City Name')}
        </Grid.Column>
        <Grid.Column>
          {this.createTable(this.props.female.success, 'Female Name')}
        </Grid.Column>
        <Grid.Column>
          {this.createTable(this.props.emitterData[NUMBER_LIST].success ? this.props.emitterData[NUMBER_LIST].success : null, 'number List')}
        </Grid.Column>
        <Grid.Column>
          {this.createTable(this.props.male.success ? this.props.male.success : null, 'male List')}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
}

List.propTypes = {
  city: PropTypes.object,
  female: PropTypes.object,
  male: PropTypes.object,
  emitterData: PropTypes.object,
  numberList: PropTypes.func,
  maleList: PropTypes.func,
  networkStatus: PropTypes.string
}

const mapDispatchToProps = dispatch => {
  return {
    numberList: () => (
      dispatch(numberListAction())
    ),
    maleList: () => (
      dispatch(maleListAction())
    )
  }
}

const mapStateToProps = createStructuredSelector({
  city: makeSelectCityList(),
  female: makeSelectFemaleList(),
  male: makeSelectMaleList(),
  networkStatus: makeSelectNetworkStatus()
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const injectEmitter = withEmitter([NUMBER_LIST])
export default compose(
  injectEmitter,
  withConnect,
  injectIntl
)(List)
