import r2 from "r2"
import to from "await-to-js"
import "babel-polyfill"

export default class apiController {
    constructor(){
    }
    async getApiResult(url){
        console.log("inside get api "+url);
          const [err,res] = await to(r2(url).json);
          if(res.error){
           return Promise.reject(res);
          }else{
            return res;
          }
    }
}
