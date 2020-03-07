import commander from "commander";
import actionController from './controllers/action'
import 'babel-polyfill'

const actionsController = new actionController();
commander
.version('1.0.0')
.description("This is a CLI Client for Dictionary");

commander
.command('defn <word>')
.alias('d')
.action((word)=>{
    actionsController.getDefinition(word);
});

commander
.command('syn <word>')
.alias('s')
.action((word)=>{
    actionsController.getSynonym(word);
});

commander
.command('ant <word>')
.alias('d')
.action((word)=>{
    actionsController.getAntonym(word);
});

commander
.command('ex <word>')
.alias('d')
.action((word)=>{
    actionsController.getExamples(word);
});

commander
.arguments('[word]')
.action( (word)=>{
    actionsController.getAll(word);
});

if(process.argv.length == 2){
    let [err,word] = await to(actionsController.getRandomWord());
}

commander.parse(process.argv);