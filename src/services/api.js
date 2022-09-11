/* eslint-disable symbol-description */
import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();


class ApiService {  
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
        
        this.localStorage = axios.create({
            //baseURL: REACT_APP_DIRECTUS_URL,
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH'
            },
            withCredentials: true,
            params: {},
        });
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ApiService(singletonEnforcer);
        }

        return this[singleton];
    }

    get = (...params) => this.localStorage.get(...params);

    post = (...params) => this.localStorage.post(...params);

    put = (...params) => this.localStorage.put(...params);

    patch = (...params) => this.localStorage.patch(...params);

    delete = (...params) => this.localStorage.delete(...params);

    updateRequestInterceptor = (token) => {
        this.localStorage.interceptors.request.use((config) => {
          const newConfig = { ...config };
          newConfig.headers['Authorization'] = `Bearer ${token}`;
    
          return newConfig;
        },(error)=>{
            return Promise.reject(error);
        });
    };

    updateResponseInterceptor = (refresh) => {
        this.localStorage.interceptors.response.use(
        response => response, 
        error => {
            let errorResponse = error.response;
            if (errorResponse.status === 401) {
                localStorage.removeItem("token");
                refresh();
            }
            
            return Promise.reject(error);
        })
    };
}

export default ApiService.instance;
