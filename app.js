import commander from "commander";
import actionController from './controllers/action';
import interactor from './controllers/interactor';

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
    actionsController.getAntonymOrSynonym(word , "synonym");
});

commander
.command('ant <word>')
.alias('a')
.action((word)=>{
    actionsController.getAntonymOrSynonym(word, "antonym");
});

commander
.command('ex <word>')
.alias('e')
.action((word)=>{
    actionsController.getExamples(word);
});

commander
.command('play')
.alias('p')
.action(async ()=>{
    console.log("fhdjhf");
   const InteractorController = new interactor();
})

commander
.arguments('<word>')
.action( (word)=>{
    actionsController.getAll(word);
});

if(process.argv.length == 2){
    actionsController.getAllWithRandom();
}

commander.parse(process.argv);