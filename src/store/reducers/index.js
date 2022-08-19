import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOCAL_AUTH_TOKEN_KEY } from '../../config';

import userReducer from '../../store/reducers/users';
import companySlice from "./store/features/companySlice";

const userDataPersistConfig = {
    key: LOCAL_AUTH_TOKEN_KEY,
    storage: storage,
    blacklist: ['errors', 'fetching'],
};

const rootReducer = combineReducers({
    user: persistReducer(userDataPersistConfig, userReducer),
    comapany: companySlice,
})

export default rootReducer;
