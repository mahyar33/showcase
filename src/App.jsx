// Project start from this component
import '@babel/polyfill'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { BrowserRouter as Router } from 'react-router-dom'
import FontFaceObserver from 'fontfaceobserver'
import { PersistGate } from 'redux-persist/integration/react'
import history from './configs/routing/History'
import Locale from './configs/Locale'
import { translationMessages } from './assets/i18n/I18n'
import { persistor, store } from './configs/redux/Store'
import Routes from './routes/Routes'
import runSaga from './configs/redux/Saga'
import { runDI } from './configs/DependencyInjection'
import Health from './configs/network/Health'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load()
  .then(() => {
    document.body.classList.add('fontLoaded')
  })

class App extends Component {
  constructor (props) {
    super(props)
    runDI()
  }
  componentDidMount () {
    runSaga(store)
    Health.runHealthCheck()
    /*   GlobalServices.checkVersion().then(payload => {
      console.log(payload, 'no')
    }).catch(e => {

    }) */
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Locale messages={translationMessages}>
            <ConnectedRouter history={history}>
              {/*       <Temp/> */}
              <Router>
                <Routes />
              </Router>
            </ConnectedRouter>
          </Locale>
        </PersistGate>
      </Provider>

    )
  }
}

export default App
