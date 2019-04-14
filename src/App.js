import '@babel/polyfill';
import React, { Component } from 'react';
import './App.css';
import {Provider} from "react-redux";
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from './config/History/history';
import {LanguageProvider} from "./config/LanguageProvider";
import { translationMessages } from './translations/i18n';
import configureStore from "./config/Redux/configureStore";
import {BrowserRouter as Router} from "react-router-dom";
import {Routes} from "./scenes/Routes";
import Temp from './scenes/Template/index'
import FontFaceObserver from 'fontfaceobserver';



// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});


class App extends Component {

  render() {
      const initialState = {};
      const store = configureStore(initialState, history);
      console.log(store)
    return (
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <ConnectedRouter history={history}>
                <Temp/>
               {/* <Router>
                    <Routes/>
                </Router>*/}
            </ConnectedRouter>
          </LanguageProvider>
        </Provider>

    );
  }
}

export default App;
