import axios from "axios";

export const httpService = axios.create({
    baseURL: 'https://tjakopec-001-site1.ftempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});