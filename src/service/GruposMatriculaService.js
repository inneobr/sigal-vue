import ApiService from '../utilities/ApiService';
import axios from 'axios';

class GruposMatriculaService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/GruposMatricula`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            Tipo:       data.getTipo(),
	        Descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/GruposMatricula/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/GruposMatricula`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/GruposMatricula/${id}`); 
    }
}
export default new GruposMatriculaService();