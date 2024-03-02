import { App } from "../constants"
import { httpService } from "./httpService";

async function getSmjerovi(){
    return await httpService.get('/Smjer')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getSmjerovi
};