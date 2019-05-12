import loginSaga from '../../redux/user/UserSaga'

const SagaRunner = (store) => {
  store.runSaga(loginSaga)
}

export default SagaRunner
