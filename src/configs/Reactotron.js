// Run [Reactotron](https://github.com/infinitered/reactotron) for debugging
import Reactotron from 'reactotron-react-js';// eslint-disable-line
import { reactotronRedux } from 'reactotron-redux';// eslint-disable-line
import sagaPlugin from 'reactotron-redux-saga';// eslint-disable-line


const reactotron = Reactotron
  .configure({ name: 'React' })// Controls connection & communication settings
  .use(reactotronRedux())// Add all built-in react native plugins
  .use(sagaPlugin())
  .connect(); // Let's connect!


export default reactotron;
