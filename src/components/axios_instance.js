import axios from 'axios';
const axios_instance = axios.create(
    {
        baseURL:"https://learn-io-api.herokuapp.com/",
        withCredentials: true,    
    }
    ); 
export default axios_instance;