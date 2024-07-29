import ApiService from '../utilities/ApiService';
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class CboService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/Rotinas`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/Rotinas/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findList() {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Rotinas`);    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Rotinas`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/Rotinas/${id}`); 
    } 
}
export default new CboService();
