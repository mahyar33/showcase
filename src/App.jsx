// Project start from this component
import '@babel/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { BrowserRouter as Router } from 'react-router-dom'
import FontFaceObserver from 'fontfaceobserver'
import { PersistGate } from 'redux-persist/integration/react'
import history from './configs/History'
import Locale from './configs/Locale'
import { translationMessages } from './assets/translations/I18n'
import ConfigureStore from './configs/redux/ConfigureStore'
import Routes from './routes/Routes'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load()
  .then(() => {
    document.body.classList.add('fontLoaded')
  })

const App = () => {
  const initialState = {}
  const { store, persistor } = ConfigureStore(initialState, history)
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

export default App
