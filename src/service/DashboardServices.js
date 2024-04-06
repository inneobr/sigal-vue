import axios from "axios";

const API_BASE_URL = 'https://economia.awesomeapi.com.br/';

class MoedaServices {
    getCotacao() {
        return axios.get(API_BASE_URL + "last/USD-BRL,EUR-BRL,BTC-BRL,ARS-BRL");
    }

    getFeriados(){
        return axios.get("https://brasilapi.com.br/api/feriados/v1/2024");
    }
}

export default new MoedaServices();