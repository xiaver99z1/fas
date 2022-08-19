import { configureStore } from "@reduxjs/toolkit";
import changeState from "./store/coreuistate/changeState";
import customerSlice from "./store/reducers/customerSlice";
import vendorSlice from "./store/reducers/vendorSlice";
import productSlice from "./store/reducers/productSlice";
import companySlice from "./store/reducers/companySlice";
import userSlice from "./store/reducers/userSlice";
import fasreferenceSlice from "./store/reducers/references/fasrefereceSlice";
import currencySlice from "./store/reducers/references/currencySlice";
import countrySlice from "./store/reducers/references/countrySlice";
import paymenttermSlice from "./store/reducers/references/paymenttermSlice";
import postinggroupSlice from "./store/reducers/references/postinggroupSlice";
import paymentmodeSlice from "./store/reducers/references/paymentmodeSlice";
import authSlice from "./store/reducers/authSlice";

const store1 = configureStore({
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

export default store1;