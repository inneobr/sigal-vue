import ApiService from '../utilities/ApiService';
import axios from 'axios';

class EmpresaService {
    register(empresa) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/empresa`, empresa, config);
    }

    pageAllFilter(filter, pagina, pageSize ) {      
        return axios.get(`${ ApiService.urlbase }/api/v1/empresa/pages`, {
            params: {
                filter: filter,
                page: pagina,
                size: pageSize
            }
        });    
    } 

    deleteEmpresa(id){
        return axios.delete(`${ ApiService.urlbase }/api/v1/empresa/delete`, {
            params: {
                id: id
            }
        }); 
    }
}
export default new EmpresaService();
