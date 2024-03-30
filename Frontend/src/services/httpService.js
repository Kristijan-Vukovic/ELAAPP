import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://kristijan1978-001-site1.htempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});

export function dohvatiPorukeAlert(podaci){
    let poruke ='';
        if(Array.isArray(podaci)){
            for(const p of podaci){
                poruke+= p.svojstvo + ': ' + p.poruka + '\n';
                }
        }else{
            poruke = podaci;
        }
    return poruke;
}