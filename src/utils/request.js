import axios from "axios";

const request = axios.create({
    baseURL:"https://-makeup-inventory-app-api.onrender.com" 

});

export default request;