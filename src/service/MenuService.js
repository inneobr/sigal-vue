import ApiService from '../utilities/ApiService';
import axios from 'axios';

class MenuService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/Menu`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/Menu/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findList() {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Menu/list`);    
    }

    findAll(pagina, pageSize) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Menu`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/Menu`, {
            params: {
                id: id
            }
        }); 
    }
}
export default new MenuService();