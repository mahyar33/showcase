import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from "reactotron-redux-saga"

const reactotron = Reactotron
    .configure({ name: 'React' })// controls connection & communication settings
    .use(reactotronRedux())// add all built-in react native plugins
    .use(sagaPlugin())
    .connect(); // let's connect!

export default reactotron