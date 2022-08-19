import { configureStore } from "@reduxjs/toolkit";
import changeState from "./store/coreuistate/changeState";
import customerSlice from "./store/features/customerSlice";
import vendorSlice from "./store/features/vendorSlice";
import productSlice from "./store/features/productSlice";
import companySlice from "./store/features/companySlice";
import userSlice from "./store/features/userSlice";
import fasreferenceSlice from "./store/features/references/fasrefereceSlice";
import currencySlice from "./store/features/references/currencySlice";
import countrySlice from "./store/features/references/countrySlice";
import paymenttermSlice from "./store/features/references/paymenttermSlice";
import postinggroupSlice from "./store/features/references/postinggroupSlice";
import paymentmodeSlice from "./store/features/references/paymentmodeSlice";
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
    currency: currencySlice,
    country: countrySlice,
    paymentterm: paymenttermSlice,
    paymentmode: paymentmodeSlice,
    postinggroup: postinggroupSlice,
    auth: authSlice,
  },
})

export default store;