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
        return axios.post(`${ ApiService.urlbase }/api/v1/Cbos`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/Cbos/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Cbos`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/Cbos/${id}`); 
    } 
}
export default new CboService();
