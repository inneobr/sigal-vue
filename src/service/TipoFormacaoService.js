import ApiService from '../utilities/ApiService';
import axios from 'axios';

class TipoFormacaoService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/TipoFormacao`, data, config);
    }

    findByUnique(data ) {
        const body = {
            Tipo:       data.getTipo(),
	        Descricao:  data.getDescricao()
        } 
        const headers = {
            'content-type': 'application/json'
        }
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao/id`, body, { headers });    
    } 

    filter(data, pagina, pageSize ) {
        const body = {
            Tipo:       data.getTipo(),
	        Descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(filtro) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/TipoFormacao`, filtro); 
    } 
}
export default new TipoFormacaoService();
