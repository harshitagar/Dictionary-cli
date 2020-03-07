import {host} from '../constants'
import to from "await-to-js"
import apiController from '../services/api'
import 'babel-polyfill'
const apiCall = new apiController();

export default class actionController {
        constructor(){
            this.urlSpecifier ={
                defn :  "/definitions?api_key=",
                exmp : "/examples?api_key=",
                reltd : "/relatedWords?api_key=",
                randm : "/randomWord?api_key="
            }

        }
    async getDefinition(word){
        let url = host.apihost + word + this.urlSpecifier.defn +host.api_key; 
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            console.log("Error "+ err.error);
        }else{
            console.log("Below are the definition of the word " + word + "\n");
            result.forEach((data)=>{
                console.log(data.text);
            })
        }
    }

    async getSynonym(word){
        let url = host.apihost + word + this.urlSpecifier.reltd +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            console.log("Error "+ err.error);
        }else{
            var flag = 0;
            result.forEach((data)=>{
               if(data.relationshipType == "synonym"){
                console.log("Below are the Synonyms of the word " + word + "\n");
                data.words.forEach((word) =>{
                    flag = 1;
                    console.log(word);
                })
               }
               if(!flag) console.log("Sorry, there is no synonym found");
            })
        }
    }
    async getAntonym(word){
        let url = host.apihost + word + this.urlSpecifier.reltd +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            console.log("Error "+ err.error);
        }else{
            var flag = 0;
            result.forEach((data)=>{
               if(data.relationshipType == "antonym"){
                console.log("Below are the antonyms of the word " + word + "\n");
                data.words.forEach((word) =>{
                    flag = 1;
                    console.log(word);
                })
               }
               if(!flag) console.log("Sorry, there is no antonym found");
            })
        }
    }
    async getExamples(word){
        let url = host.apihost + word + this.urlSpecifier.exmp +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            console.log("Error "+ err.error);
        }else{
            console.log("Below are the examples of the word " + word + "\n");
            result.examples.forEach((data)=>{
                console.log(data.text);
            })
        }
    }
    async getAll(word){
        await this.getDefinition(word);
        await this.getAntonym(word);
        await this.getSynonym(word);
        await this.getExamples(word);
    }
    async getRandomWord(){
        let url = host.apihostRand+this.urlSpecifier.randm+host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            console.log("Error "+err.error);
            return Promise.reject("Error");
        }else{
            console.log(result);
            return result.word;
        }
    }
    async getAllWithRandom(){
        console.log("in ranmnn")
        let [err,word] = await to(this.getRandomWord());
        console.log(err);
        if(!err){
           this.getAll(word);
       }
    }
}