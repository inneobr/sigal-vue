import ApiService from '../utilities/ApiService';
import axios from 'axios';

class TraducaoService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/Traducao`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            idioma:  data.getIdioma(),
	        rotina:  data.getRotina(),
            chave:   data.getChave()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/Traducao/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Traducao`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/Traducao/${id}`); 
    }   
}
export default new TraducaoService();
