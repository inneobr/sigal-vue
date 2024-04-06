import axios from "axios"
import router from './router';
import StorageService from './service/StorageService';

window.axios = axios
axios.defaults.withCredentials = false

axios.interceptors.request.use(
    (config) => { 
        if(config.url && config.url.indexOf('/api/v1/usuario/login') >= 0) { 
            return config; 
        }  
            
        const auth = StorageService.getAuth();
             
        if(auth){
            config.headers.Authorization   = `Bearer ${auth.accessToken}`;       
        }
        else {
            subscribers = [];
            router.push('/auth/login');
        }        
        return config;
    },

    (error) => { return Promise.reject(error); }
);

let subscribers = [];

axios.interceptors.response.use(
    (config) => { return config },

    (error) => { const { config,  response: { status, data}  } = error; 

        if(status === 401){
            logout();
            return Promise.reject(false);
        }    
        return Promise.reject(error);        
    }
);

function logout() {
    StorageService.setAuth();
    StorageService.setUser();
    router.push('/auth/login');
}