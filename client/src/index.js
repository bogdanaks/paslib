import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// Include bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))
const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'))
