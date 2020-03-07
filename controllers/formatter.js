import chalk from "chalk";

export default class FormatterController {
    formatHeading(heading){
        console.log("\n"+chalk.bold.yellow.underline(heading)+"\n");
    }
    formatError(error){
        console.log("\n"+chalk.red(error)+"\n");
    }
    formatData(data){
        console.log(chalk.white.italic(data))
    }
}