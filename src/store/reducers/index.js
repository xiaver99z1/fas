import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOCAL_AUTH_TOKEN_KEY } from '../../config';

import userReducer from '../../store/reducers/users';
import changeState from './../coreuistate/changeState';
import companySlice from './companySlice';
import customerSlice from './customerSlice';
import vendorSlice from './vendorSlice';
import productSlice from './productSlice';
import userSlice from './userSlice';
import fasreferenceSlice from './references/fasrefereceSlice';
import currencySlice from './references/currencySlice';
import countrySlice from './references/countrySlice';
import paymenttermSlice from './references/paymenttermSlice';
import paymentmodeSlice from './references/paymentmodeSlice';
import postinggroupSlice from './references/postinggroupSlice';


const userDataPersistConfig = {
    key: LOCAL_AUTH_TOKEN_KEY,
    storage: storage,
    blacklist: ['errors', 'fetching'],
};

const rootReducer = combineReducers({
    user: persistReducer(userDataPersistConfig, userReducer),
    coreuistate: changeState,
    company: companySlice,
    customer: customerSlice,
    vendor: vendorSlice,
    product: productSlice,
    profile: userSlice,
    fasreference: fasreferenceSlice,
    currency: currencySlice,
    country: countrySlice,
    paymentterm: paymenttermSlice,
    paymentmode: paymentmodeSlice,
    postinggroup: postinggroupSlice,
})

export default rootReducer;
