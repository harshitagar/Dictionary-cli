import chalk from "chalk";
import spinner from "cli-spinner";

let spin = new spinner.Spinner("Loading");
export default class FormatterController {
    formatHeading(heading){
        console.log("\n"+chalk.bold.yellow.underline(heading)+"\n");
    }
    formatError(error){
        console.log("\n"+chalk.red(error)+"\n");
    }
    formatData(data){
        console.log(chalk.white.bold(data))
    }
    formatCorrectAnswer(data){
        console.log(chalk.green.bold(data));
    }
    startSpinner(){
        spin.start();
    }
    stopSpinner(){
        spin.stop(true);
    }

}