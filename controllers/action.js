import {host} from '../constants';
import to from "await-to-js";
import apiController from '../services/api';
import formatter from './formatter';
import 'babel-polyfill'

const apiCall = new apiController();
const formatterController = new formatter();

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
        const [err,result] = await to(this.getDefinitionData(word));
        if(err){
            formatterController.formatError("Error "+ err.error);
        }else{
            formatterController.formatHeading("\n"+"Below are the definition of the word " + word + "\n");
            result.forEach((data,i)=>{
                formatterController.formatData(i+1+"."+data.text);
            })
        }
    }   
    async getDefinitionData(word){
        let url = host.apihost + word + this.urlSpecifier.defn +host.api_key; 
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            return Promise.reject(err);
        }else{
            return result;
        }
    }
    
    async getAntonymSynonym(word){
        let url = host.apihost + word + this.urlSpecifier.reltd +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            formatterController.formatError("Error "+ err.error);
        }else{
            result.forEach((data)=>{
               let related=data.relationshipType
                formatterController.formatHeading("\n"+"Below are the "+related+" of the word " + word + "\n");
                data.words.forEach((word,i) =>{
                    formatterController.formatData(i+1+"."+word);
                })
            })
        }
    }
    async getAntonymOrSynonym(word,related){
        const [err,result] = await to(this.getAntonymOrSynonymData(word,related));
        if(err){
            formatterController.formatError("Error "+ err.error);
        }else{
            var flag = 0;
            result.forEach((data)=>{
               if(data.relationshipType == related){
                formatterController.formatHeading("\n"+"Below are the " + related + " of the word " + word + "\n");
                data.words.forEach((word,i) =>{
                    flag = 1;
                    formatterController.formatData(i+1+"."+word);
                })
               }
            })
            if(!flag) formatterController.formatError("Sorry, there is no "+ related + " found");
        }
    }
    async getAntonymOrSynonymData(word,related){
        let url = host.apihost + word + this.urlSpecifier.reltd +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
           return Promise.reject(err);
        }else{
           return result;
        }
    }
    async getExamples(word){
        const [err,result] = await to(this.getExamplesData(word));
        if(err){
           formatterController.formatError("Error "+ err.error);
        }else{
            formatterController.formatHeading("\n"+"Below are the examples of the word " + word + "\n");
            result.examples.forEach((data,i)=>{
                formatterController.formatData(i+1+"."+data.text);
            })
        }
    }
    async getExamplesData(word){
        let url = host.apihost + word + this.urlSpecifier.exmp +host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
          Promise.reject(err);
        }else{
           return result;
        }
    }
    async getAll(word){
        await this.getDefinition(word);
        await this.getAntonymSynonym(word);
        await this.getExamples(word);
    }
    async getRandomWord(){
        let url = host.apihostRand+this.urlSpecifier.randm+host.api_key;
        const [err,result] = await to(apiCall.getApiResult(url));
        if(err){
            return Promise.reject("Error");
        }else{
            return result.word;
        }
    }
    async getAllWithRandom(){
        let [err,word] = await to(this.getRandomWord());
        if(!err){
           this.getAll(word);
       }
    }
}