import r2 from "r2"

export default class apiController {

    constructor(){

    }
    getApiResult(url){
        r2(url).json
    .then(res =>{ 
        return res;
    });
    .fail(error => {
        return "error";
    })
    }
}
