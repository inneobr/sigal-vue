import StorageKeys from "../store/storageKey";

class StorageService {
    getAuth() {
        let auth = sessionStorage.getItem(StorageKeys.Auth);

        if(auth == null) {
            return null;
        }
        else {
            return JSON.parse(auth);
        }
    }

    setAuth(auth) {
        if(auth == undefined || auth == null) {
            sessionStorage.removeItem(StorageKeys.Auth);
        }
        else {
            sessionStorage.setItem(StorageKeys.Auth, JSON.stringify(auth));
        }
    }

    getUser() {
        let user = sessionStorage.getItem(StorageKeys.User);

        if(user == null) {
            return null;
        }
        else {
            return JSON.parse(user);
        }
    }

    setUser(user) {
        if(user == undefined || user == null) {
            sessionStorage.removeItem(StorageKeys.User);
        }
        else {
            sessionStorage.setItem(StorageKeys.User, JSON.stringify(user));
        }
    }
}
export default new StorageService();