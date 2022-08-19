import { combineReducers } from 'redux'; //'@reduxjs/toolkit';
import coreuiStateSlice from './coreuistate/changeState';
import customerSlice from './features/customer/customerSlice';


export default rootReducers = combineReducers({
   coreuiState: coreuiStateSlice.reducer,
   customerDim: customerSlice.reducer,
})