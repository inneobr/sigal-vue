import ApiService from '../utilities/ApiService';
import axios from 'axios';

class JurisdicoesService {
    save(data) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/Jurisdicoes`, data, config);
    }  

    filter(data, pagina, pageSize ) {
        const body = {
            descricao:  data.getDescricao()
        } 
        return axios.get(`${ ApiService.urlbase }/api/v1/Jurisdicoes/filter`, body,  {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }

    findAll(pagina, pageSize ) {        
        return axios.get(`${ ApiService.urlbase }/api/v1/Jurisdicoes`, {
            params: {
                page: pagina,
                size: pageSize
            }
        });    
    }
    
    deleteRegister(id) {
        return axios.delete(`${ ApiService.urlbase }/api/v1/Jurisdicoes`, {
            params: {
                id: id
            }
        }); 
    } 
}
export default new JurisdicoesService();
