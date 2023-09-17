import axios from "axios";

const request = axios.create({
    baseURL:"https://parisianmakeup-inventory-app-api.onrender.com" 

});

export default request;