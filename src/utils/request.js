import axios from "axios";

const request = axios.create({
    baseURL:"parisian-makeup-inventory-app-api" 

});

export default request;