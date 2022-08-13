import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'react-app-polyfill/stable';
import 'core-js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { getUsers } from './store/features/userSlice';
import { getVendors } from './store/features/vendorSlice';
import { getFasReference, getCountries, getPaymentMode, getCurrency } from './store/features/fasrefereceSlice';

store.dispatch(getUsers());
store.dispatch(getVendors());
store.dispatch(getFasReference());
store.dispatch(getCountries());
store.dispatch(getCurrency());
store.dispatch(getPaymentMode());

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()