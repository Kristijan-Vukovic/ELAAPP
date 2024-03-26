import { App } from "../constants"
import { httpService } from "./httpService";

async function getLetovi(){
    return await httpService.get('/Let')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getLetovi
};