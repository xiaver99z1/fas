import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { NODE_ENV } from '../config';

import {
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, 
} from 'redux-persist';
import authMiddleware from './middleware/authMiddleware';

import { getCompanies } from './reducers/companySlice';
import { getCustomers } from './reducers/customerSlice';
import { getVendors } from './reducers/vendorSlice';
import { getProducts } from './reducers/productSlice';
import { getCurrencies } from './reducers/references/currencySlice';
import { getCountries } from './reducers/references/countrySlice';
import { getPaymentTerms } from './reducers/references/paymenttermSlice';
import { getPostingGroups } from './reducers/references/postinggroupSlice';
import { getPaymentModes } from './reducers/references/paymentmodeSlice';



const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(authMiddleware),
});

if (NODE_ENV === 'development') {
    (module).hot?.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
}

store.dispatch(getCompanies());
store.dispatch(getCustomers());
store.dispatch(getVendors());
store.dispatch(getProducts());

/* REFERENCES */
store.dispatch(getCurrencies());
store.dispatch(getCountries());
store.dispatch(getPaymentTerms());
store.dispatch(getPostingGroups());
store.dispatch(getPaymentModes());


export const persistor = persistStore(store);

export default { store, persistor };

