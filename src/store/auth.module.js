import StorageService from '../service/StorageService';
import UsuarioService from '../service/UsuarioService';

const storageUser = StorageService.getUser(); 
const initialState = storageUser
? { status: { loggedIn: true }, user: storageUser }
: { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                UsuarioService.logout();
                commit('logout');

                UsuarioService.login(user)
                    .then(({ data }) => {
                        StorageService.setAuth(data);
                        UsuarioService.findByUsername(user.username)
                        .then(({ data }) => {
                            StorageService.setUser(data);
                            commit('loginSuccess', StorageService.getUser());
                            return resolve(data);
                        }).catch(error => {
                            commit('loginFailure');
                            return reject(error);
                        });
                    }).catch(error => {
                        commit('loginFailure');
                        return reject(error);
                    });
            });
        },

        logout({ commit }) {
            UsuarioService.logout();
            commit('logout');
        },
    },

    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    }
}