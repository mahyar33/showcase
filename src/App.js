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
const initialState = {};
const store = configureStore(initialState, history);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <ConnectedRouter history={history}>
                <div>df</div>
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
