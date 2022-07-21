import { program } from "commander";
import { ProtoRevert } from "./ProtoRevert";
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

program
    .option("-h, --dest-host <ip>", "host to to connect to", "127.0.0.1")
    // .option("--listen <ip>", "ip to listen for incomming connection", "127.0.0.1")
    .option("-s, --source <port>", "address to listen for incomming connextion", "9223")
    .option("-d, --destination <port>", "Address of the Chrome developer port", "9222")
    .option("-p, --prefix <name>", "output fule prefix", "code");
program.parse();

const {source, destination, destHost, prefix } = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

const protoRevert = new ProtoRevert({
    srcPort: Number(source),
    dstPort: Number(destination),
    dstHost: destHost,
    // srcHost: options.listen,
});

async function main() {
    await protoRevert.start();
    console.log(`You can now connect your automation script to http://127.0.0.1:${source}`)
    console.log(`Any incomming connextion will be foward to http://${destHost}:${destination}`)
    const rl = readline.createInterface({ input, output });
    rl.question("Press any Enter to terminate the session", () => {
        console.log(`Generating script... with ${prefix} prefix`);
        rl.close();
        protoRevert.writeSessions(prefix);
        console.log('all done');
        protoRevert.close();
    });
}

void main();