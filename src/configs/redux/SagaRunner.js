import { all } from 'redux-saga/effects'
import UserSaga from '../../redux/user/UserSaga'
import CitySaga from '../../redux/city/CitySaga'
import FemaleSaga from '../../redux/female/FemaleSaga'
import MaleSaga from '../../redux/male/MaleSaga'
import NumberSaga from '../../redux/number/NumberSaga'
import GlobalSaga from '../../redux/global/GlobalSaga'

function * rootSaga () {
  yield all([
    ...GlobalSaga,
    ...UserSaga,
    ...CitySaga,
    ...FemaleSaga,
    ...MaleSaga,
    ...NumberSaga

  ])
}
const SagaRunner = (store) => {
  store.runSaga(rootSaga)
}

export default SagaRunner
