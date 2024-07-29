import ApiService from '../utilities/ApiService';
import axios from 'axios';

class MenuItemService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/MenuItem`, data, config);
    }  

    filter(filter, pagina, pageSize ) { 
        const body = {
            menuId: filter.menuId
        } 
        return axios.post(`${ ApiService.urlbase }/api/v1/MenuItem/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }            
        });    
    }

    findList() {        
        return axios.get(`${ ApiService.urlbase }/api/v1/MenuItem/list`);    
    }

    findAll(pagina, pageSize) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/MenuItem`,  {
            params: {
                page: pagina,
                size: pageSize
            }            
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/MenuItem`, {
            params: {
                id: id
            }
        }); 
    }
}
export default new MenuItemService();