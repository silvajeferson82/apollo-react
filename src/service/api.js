import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000'
    // baseURL: 'https://backend-investidores.loca.lt/'
})

export default api;