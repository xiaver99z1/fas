import axios from 'axios';

const { REACT_APP_DIRECTUS_URL, REACT_APP_DIRECTUS_TOKEN } = process.env

export const axiosInstance = axios.create({
   baseURL: REACT_APP_DIRECTUS_URL,
   headers: {
     'Authorization': `Bearer ${REACT_APP_DIRECTUS_TOKEN}`,
     'Content-Type' : 'application/json',
     //'X-Http-Method-Override': 'PATCH',
     //'Access-Control-Allow-Headers': '*',
     //'Access-Control-Allow-Origin' : '*',
     //'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH',
   }
 });