import { App } from "../constants"
import { httpService } from "./httpService";

async function getPiloti(){
    return await httpService.get('/Pilot')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getPiloti
};