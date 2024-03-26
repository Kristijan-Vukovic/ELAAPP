import { App } from "../constants"
import { httpService } from "./httpService";

async function getZrakoplovi(){
    return await httpService.get('/Zrakoplov')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getZrakoplovi
};