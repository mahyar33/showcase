// Project start from this component
import '@babel/polyfill'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { BrowserRouter as Router } from 'react-router-dom'
import FontFaceObserver from 'fontfaceobserver'
import { PersistGate } from 'redux-persist/integration/react'
import history from './configs/History'
import Locale from './configs/Locale'
import { translationMessages } from './assets/translations/I18n'
import { persistor, store } from './configs/redux/ConfigureStore'
import Routes from './routes/Routes'
import SagaRunner from './configs/redux/SagaRunner'
import { runDI } from './configs/DependencyInjection'
import GlobalServices from './services/GlobalServices'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load()
  .then(() => {
    document.body.classList.add('fontLoaded')
  })

class App extends Component {
  componentDidMount () {
    SagaRunner(store)
    runDI()
    GlobalServices.checkVersion().then(payload => {
      console.log(payload, 'no')
    }).catch(e => {
      console.log('ok', e.message)
    })
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
;              </Router>
            </ConnectedRouter>
          </Locale>
        </PersistGate>
      </Provider>

    )
  }
}

export default App
