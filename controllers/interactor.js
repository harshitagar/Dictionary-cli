import inquire from "inquirer";
import action from "./action";
import to from "await-to-js";
import "babel-polyfill";
const actionController = new action();

const prompt = inquire.prompt();
export default class InteractorController{
     constructor(){
        this.getAllData();
        this.tries = 1;
        this.option = 0;
        this.hintIndex = 0;
        this.question = "Please Enter Your Choice";
        this.options = ["1.Try Again","2.Hint","3.Quit"]
        
    }
    async getAllData(){
        let [err,word] = await to(actionController.getRandomWord());
        if(!err){
            this.word = word;
            [err,this.definition] = await to(actionController.getDefinitionData(this.word));
            if(!err) [err,this.examples] = await to(actionController.getExamplesData(this.word));
            if(!err) [err,this.antonym] = await to(actionController.getAntonymOrSynonymData(this.word,"antonym"));
            if(!err) [err,this.synonym] = await to(actionController.getAntonymOrSynonymData(this.word,"synonym"));
            console.log(this);
            return this;
            
        }
    }
    async startPlaying(){
         console.log("This is a game, Please choose a word whose definition is following--\n"+this.definition[this.option].text);
            while(tries<4){
                let choice = await this.enterChoice();
                if(choice.answer == this.word){
                    console.log(" YOU WON!!!!!");
                    break;
                }else{
                    let option = await this.enterChoice()
                    if(option.answer == 1){
                        console.log("Try Again");
                    }else if(option.answer == 2){
                        console.log("Hint")
                    }else{
                        console.log("exit")
                        break;
                    }
                }
            }
    }
    async enterChoice(){
        const choices = {
            type: 'input',
            name: 'answer',
            message: this.question
        };
        return await prompt(choices);
    }
    async enterOptions(){
        const options = {
            type: 'list',
            name: 'answer',
            message: 'You can choose one among this-',
            choice: this.options
        }
        return await prompt(options);
    }
}
