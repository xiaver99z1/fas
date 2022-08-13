import { configureStore } from "@reduxjs/toolkit";
import changeState from "./store/coreuistate/changeState";
import customerSlice from "./store/features/customerSlice";
import vendorSlice from "./store/features/vendorSlice";
import productSlice from "./store/features/productSlice";
import companySlice from "./store/features/companySlice";
import userSlice from "./store/features/userSlice";
import fasreferenceSlice from "./store/features/fasrefereceSlice"
import authSlice from "./store/features/authSlice";

const store = configureStore({
  reducer: {
    coreuistate: changeState,
    company: companySlice,
    customer: customerSlice,
    vendor: vendorSlice,
    product: productSlice,
    user: userSlice,
    fasreference: fasreferenceSlice,
    auth: authSlice,
  },
})

export default store;