// Runs [Reactotron](https://github.com/infinitered/reactotron) for debugging and controls connection & communication settings
import Reactotron from 'reactotron-react-js';// eslint-disable-line
import { reactotronRedux } from 'reactotron-redux';// eslint-disable-line
import sagaPlugin from 'reactotron-redux-saga';// eslint-disable-line

const reactotron = Reactotron
  .configure({ name: 'React' })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect() // Let's connect!

export default reactotron
