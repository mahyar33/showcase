import { all } from 'redux-saga/effects'
import watchUser from '../../redux/user/UserSaga'

function * rootSaga () {
  yield all([
    ...watchUser
  ])
}
const SagaRunner = (store) => {
  store.runSaga(rootSaga)
}

export default SagaRunner
