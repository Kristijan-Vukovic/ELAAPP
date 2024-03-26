import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://kristijan1978-001-site1.htempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});