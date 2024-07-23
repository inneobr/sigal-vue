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
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/TipoFormacao/${id}`); 
    } 

    formacaoEnum(){
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao/tipFormacao`); 
    }

    complementarEnum(){
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao/tipComplementar`); 
    }

    disponivelEnum(){
        return axios.get(`${ ApiService.urlbase }/api/v1/TipoFormacao/tipPublico`); 
    }
}
export default new TipoFormacaoService();
