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

import { getCompanies } from './reducers/companySlice'
import { getCustomers } from './reducers/customerSlice'
import { getVendors } from './reducers/vendorSlice'
import { getProducts } from './reducers/productSlice'

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

//store.dispatch(getCompanies());
//store.dispatch(getCustomers());
store.dispatch(getVendors());
store.dispatch(getProducts());


export const persistor = persistStore(store);

export default { store, persistor };

