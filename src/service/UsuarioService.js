import ApiService from '../utilities/ApiService';
import StorageService from '../service/StorageService';
import axios from 'axios';

class UsuarioService {
    login(user) {
		return new Promise((resolve, reject) => {
			const body = {
				username: user.username,
                password: user.password
			}

			const headers = {
				'content-type': 'application/json'
			}

			axios.post(`${ ApiService.urlbase }/api/v1/usuario/login`, body, { headers })
				.then(response => {
					return resolve(response);
				})
				.catch(error => {
					return reject(error);
				});
		});
	}

    register(user) {
        debugger
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(`${ ApiService.urlbase }/api/v1/usuario/register`, user, config);
    }

    findByUsername( username ) {       
        return axios.get(`${ ApiService.urlbase }/api/v1/usuario/filter`, {
            params: {
                username: username,
            }
        });    
    }

    pageAll(filter, pagina, pageSize  ) {       
        return axios.get(`${ ApiService.urlbase }/api/v1/usuario/pages`, {
            params: {
                filter: filter,
                page: pagina,
                size: pageSize
            }
        });    
    } 

    deleteUsuario(id){        
        return axios.delete(`${ ApiService.urlbase }/api/v1/usuario/delete`, {
            params: {
                id: id
            }
        }); 
    }

    getRoles() {       
        return axios.get(`${ ApiService.urlbase }/api/v1/usuario/roles`);    
    }

    logout() {
		StorageService.setAuth(null);
		StorageService.setUser(null);
	}
}
export default new UsuarioService();