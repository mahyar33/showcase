// Project start from this component
import '@babel/polyfill';
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import { PersistGate } from 'redux-persist/integration/react';
import history from './configs/history/history';
import LanguageProvider from './configs/languageProvider';
import { translationMessages } from './assets/translations/i18n';
import configureStore from './configs/redux/configureStore';
import Routes from './routes/Routes';


// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load()
  .then(() => {
    document.body.classList.add('fontLoaded');
  });


const App = () => {
  const initialState = {};
  const { store, persistor } = configureStore(initialState, history);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedRouter history={history}>
            {/*       <Temp/> */}
            <Router>
              <Routes />
            </Router>
          </ConnectedRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>

  );
};

export default App;
