import { configureStore } from "@reduxjs/toolkit";

import changeState from "./store/coreuistate/changeState";
import customerSlice from "./store/features/customer/customerSlice";
import vendorSlice from "./store/features/vendor/vendorSlice";
import productSlice from "./store/features/product/productSlice";
import companySlice from "./store/features/company/companySlice";
import userSlice from "./store/features/user/userSlice";
import authSlice from "./store/common/authSlice";

const store = configureStore({
  reducer: {
    coreuistate: changeState,
    company: companySlice,
    customer: customerSlice,
    vendor: vendorSlice,
    product: productSlice,
    user: userSlice,
    auth: authSlice,
  }
})

export default store;