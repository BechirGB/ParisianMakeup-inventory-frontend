import axios from "axios";

const request = axios.create({
    baseURL:"http://localhost:8000" 
        //baseURL:"https://parisian-makeup-inventory-app-api.onrender.com" *//

});

export default request;