import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from 'src/store/middleware/directus'

//Selection dropdowns
export const getCustomerType = createAsyncThunk(
   "customer/getCustomerType", 
   async ({ id }) => {
     //Fetch by ID
     return await axiosInstance
       .get(`/items/customer_type/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getCountries = createAsyncThunk(
   "customer/getCountries", 
   async () => {
     //Fetch by ID
     return await axiosInstance
       .get(`/items/country/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getPaymentMode = createAsyncThunk(
   "customer/getPaymentMode", 
   async ({ id }) => {
     //Fetch by ID
     return await axiosInstance
       .get(`/items/payment_mode/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getCompany = createAsyncThunk(
   "customer/getCompany", 
   async ({ id }) => {
     //Fetch customers by ID
     return await axiosInstance
       .get(`/items/company/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 