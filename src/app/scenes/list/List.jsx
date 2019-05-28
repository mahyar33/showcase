// Including different tables to show how we can implement different inputs taking from server and handle different conditions when user goes offline or online.<br />
// `City` and `female` take from socket handling in saga as a background process and store in redux. Component receives them from redux (selectors).<br />
// `male` and `number` take from API. `male` stores in redux and component gets it from redux (selectors) but `number` doesn't store in redux and gets it by event emitters which are handle by [**withEmitter**](../../components/withEmitter/withEmitter.html) HOC component.<br />
// All data whether  socket or api exist in `success` property and all error in `error` property.<br />
// In componentDidMount react lifecycle we call `numberList` and `maleList` which are 2 actions that 2sagas listen to them and invoke API.<br />
// `networkStatus` takes from redux showing whether we are online or not.<br />
// emitter injected to component by withEmitter HOC and it takes array of event. In this component `NUMBER_LIST` is the event that HOC listen to it.<br />
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { injectIntl } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { makeSelectCityList } from '../../../redux/city/CitySelectors'
import { makeSelectFemaleList } from '../../../redux/female/FemaleSelectors'
import PropTypes from 'prop-types'
import { makeSelectMaleList } from '../../../redux/male/MaleSelectors'
import withEmitter from '../../components/withEmitter/withEmitter'
import { NUMBER_LIST } from '../../../redux/number/NumberConstants'
import { numberListAction } from '../../../redux/number/NumberActions'
import { maleListAction } from '../../../redux/male/MaleActions'
import { makeSelectNetworkStatus } from '../../../redux/global/GlobalSelectors'
import SimpleTable from '../../components/simpleTable/SimpleTable'
import NetworkStatus from '../../components/networkStatus/NetworkStatus'

class List extends Component {
  componentDidMount () {
    const { numberList, maleList } = this.props
    numberList()
    maleList()
  }

  componentWillUnmount () {

  }
  render () {
    const { networkStatus, city, female, emitterData, male } = this.props
    const number = emitterData[NUMBER_LIST]
    return <Grid padded>
      {networkStatus
        ? <Grid.Row columns={1}>
          <Grid.Column>
            <NetworkStatus networkStatus={networkStatus} />
          </Grid.Column>
        </Grid.Row> : null}
      <Grid.Row columns={2}>
        <Grid.Column>
          <SimpleTable items={city.success ? city.success : []} title={'City Name'} />
        </Grid.Column>
        <Grid.Column>
          <SimpleTable items={female.success ? female.success : []} title={'Female Name'} />
        </Grid.Column>
        <Grid.Column>
          <SimpleTable items={number.success ? number.success : []} title={'number Name'} />
        </Grid.Column>
        <Grid.Column>
          <SimpleTable items={male.success ? male.success : []} title={'male List'} />
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
