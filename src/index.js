import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-app-polyfill/stable';
import 'core-js';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppStore from './store';
import reportWebVitals from './reportWebVitals';


// STORE
const { store, persistor } = AppStore;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()