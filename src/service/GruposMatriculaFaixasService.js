import ApiService from '../utilities/ApiService';
import axios from 'axios';

class GruposMatriculaFaixasService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/GruposMatriculaFaixas`, data, config);
    }  

    filter(filter, pagina, pageSize ) { 
        const body = {
            grupo: filter.grupo
        } 
        return axios.post(`${ ApiService.urlbase }/api/v1/GruposMatriculaFaixas/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }            
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/GruposMatriculaFaixas`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/GruposMatriculaFaixas/${id}`); 
    }
}
export default new GruposMatriculaFaixasService();