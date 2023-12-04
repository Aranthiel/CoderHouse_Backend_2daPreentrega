import { program } from "commander";

program
    .option('--db <db>', 'define el modo de persistencia de datos', 'mongo')
    .option('--port <port>', 'defiene el puerto a ejecutar', 8080)
    .parse();

const options = program.opts();
console.log('selected commander options', options);

export default program;