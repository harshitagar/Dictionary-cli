import {prompt} from "inquirer";
import action from "./action";
import to from "await-to-js";
import formater from "./formatter"
const formatterController = new formater();
const actionControllers = new action();

export default class InteractorController{
     constructor(){
        formatterController.startSpinner();
        this.getAllData().then(()=>{
        formatterController.stopSpinner();
        this.question = "Please Enter the word can match the above description-";
        this.options = ["1.Try Again","2.Hint","3.Quit"]
        this.startPlaying();
        });
    }
    async getAllData(){
        let [err,word] = await to(actionControllers.getRandomWord());
        if(!err){
            this.word = word;
            [err,this.definition] = await to(actionControllers.getDefinitionData(this.word));
            if(!err) [err,this.antonym] = await to(actionControllers.getAntonymOrSynonymData(this.word,"antonym"));
            if(!err) [err,this.synonym] = await to(actionControllers.getAntonymOrSynonymData(this.word,"synonym"));

            if(this.antonym[0] && this.antonym[0].words){
                this.antonym = this.antonym[0].words;
            }else{
                this.antonym = [];
            }
            if(this.synonym[0] && this.synonym[0].words){
                this.synonym = this.synonym[0].words;
            }else{
                this.synonym = [];
            }
            let newDef = [];
            this.definition.forEach(element => {
                newDef.push(element.text);
            });
            this.definition = Object.assign([],newDef);
            this.allDefinition = Object.assign([],this.definition);
            this.allAntonym =  Object.assign([],this.antonym);
            this.allSynonym =  Object.assign([],this.synonym);
            console.log(this);
            return this;
            
        }
    }
    async startPlaying(){
        formatterController.formatHeading("This is a game, Please choose a word whose definition is following--\n"+this.definition[this.definition.length-1]);
         this.definition.pop();
            while(true){
                let choice = await this.enterChoice();
                if(choice.answer == this.word || this.synonym.includes(choice.answer)){
                    formatterController.formatCorrectAnswer(" YOU WON!!!!!");
                    break;
                }else{
                    formatterController.formatError("You entered a wrong answer")
                    let option = await this.enterOptions()
                    let answer = this.options.indexOf(option.answer);
                    if(answer == 0){
                        continue;
                    }else if(answer == 1){
                        this.showHint();
                    }else{
                        formatterController.formatCorrectAnswer("The Word is");
                        formatterController.formatData(this.word);
                        formatterController.formatCorrectAnswer("The Antonyms of the word are");
                        formatterController.formatData(this.allAntonym); 
                        formatterController.formatCorrectAnswer("The Synonyms of the word are");
                        formatterController.formatData(this.allSynonym);
                        formatterController.formatCorrectAnswer("The Definitions of the word are");
                        formatterController.formatData(this.allDefinition);
                        break;
                    }
                }
            }
    }
    async showHint(){
        var randomHint = parseInt(Math.random()*3);
        if(randomHint == 0){
            if(this.definition.length>0){
               formatterController.formatHeading("Another Definition of the word is "+ this.definition.pop())
            }else{
                formatterController.formatHeading("Jumbled word is "+this.jumbleWord(this.word))
            }
        }else if(randomHint == 1){
            if(this.antonym.length>0){
                formatterController.formatHeading("Another antonym of the word is "+ this.antonym.pop())
            }else{
                formatterController.formatHeading("Jumbled word is "+this.jumbleWord(this.word))
            }
        }else  if(randomHint == 2){
            if(this.synonym.length>0){
                formatterController.formatHeading("Another synonym of the word is "+ this.synonym.pop())
            }else{
                formatterController.formatHeading("Jumbled word is "+this.jumbleWord(this.word))
            }
        }
    }

        jumbleWord(fun){
            var letter = fun;
            var jumbledWord = "";
            for (var i = 0; i < fun.length; i++) {
                var Chindex = Math.floor(Math.random() * letter.length);
                jumbledWord = jumbledWord + letter.charAt(Chindex);
                letter = letter.substr(0, Chindex) + letter.substr(Chindex + 1);
        }
        return jumbledWord;
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
            choices: this.options
        }
        return await prompt(options);
    }
}
