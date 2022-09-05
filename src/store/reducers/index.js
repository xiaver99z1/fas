import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOCAL_AUTH_TOKEN_KEY } from '../../config';

import userReducer from '../../store/reducers/users';
import changeState from './../coreuistate/changeState';
import companySlice from './companySlice';
import customerSlice from './customerSlice';
import vendorSlice from './vendorSlice';
import vendorpriceSlice from './vendorpriceSlice';
import productSlice from './productSlice';
import poSlice from './poSlice';
//import accountSlice from './accountSlice';
import fasreferenceSlice from './references/fasrefereceSlice';
import currencySlice from './references/currencySlice';
import countrySlice from './references/countrySlice';
import paymenttermSlice from './references/paymenttermSlice';
import paymentmodeSlice from './references/paymentmodeSlice';
import pstgroupSlice from './references/pstgroupSlice';


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
    vendorprice: vendorpriceSlice,
    product: productSlice,
    po: poSlice,
    fasreference: fasreferenceSlice,
    currency: currencySlice,
    country: countrySlice,
    paymentterm: paymenttermSlice,
    paymentmode: paymentmodeSlice,
    pstgroup: pstgroupSlice,
})

export default rootReducer;
