import ApiService from '../utilities/ApiService';
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class TipoCargosService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/TipoCargos`, data, config);
    }

    findByUnique(data ) {
        const body = {
            Tipo:       data.getTipo(),
	        Descricao:  data.getDescricao()
        } 
        const headers = {
            'content-type': 'application/json'
        }
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoCargos/id`, body, { headers });    
    } 

    filter(data, pagina, pageSize ) {
        const body = {
            Tipo:       data.getTipo(),
	        Descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoCargos/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoCargos`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(filtro) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/TipoCargos`, filtro); 
    } 
}
export default new TipoCargosService();
