#!/usr/bin/env node
import pico from "picocolors";
import * as logger from "../logger";
import { FrostGenerator } from "../generator";
import CreateNewProject from "../new";

const f = new FrostGenerator();

f.loadConfigFile();
const args: string = process.argv[2];
const options: string = process.argv[3];
const optionsArg = process.argv[4];
let HELP_RESPONSE = `

${pico.cyan(pico.bold("HELP MENU"))}


Frost is a static site generator made by the developers at SnowflakeDev Community. 
If you have any problems with the package, feel free to open an issue at
https://github.com/DevSnowflake/frost/issues

${pico.magenta("Feel like Contributing?")}
https://github.com/DevSnowflake/frost/pulls. Open a pull request with your feature or
fix. Any pull requests are welcome. 

${pico.magenta("Do you like the module?")}
Star it on github, it means a lot.
https://github.com/DevSnowflake/frost

${pico.bold("Commands")}
-----------------------------------

${pico.cyan("serve")} --serve -s :: Start your website on a local dev server.
${pico.cyan("help")}  --help  -h :: Opens up this help menu.
${pico.cyan("build")} --build -b :: Build Your Application.
${pico.cyan("init")}  --init  -i :: Initialize a new application.
`;
if (args == "--serve" || args == "-s") {
    if (options == "--port") {
        if (optionsArg) f.serve(Number(optionsArg));
        else if (!optionsArg) f.serve(5348);
    } else if (!options) f.serve(5348);
}

if (args == "--help" || args == "-h") {
    console.log(HELP_RESPONSE);
}
if (args == "--build" || args == "-b") {
    f.build();
}
if (args == "--version" || args == "-v") {
    logger.info(f.version());
}
if (args == "--init" || args == "-i") {
    let dir = process.cwd();
    let force = false;

    if (process.argv.includes("--force")) {
        force = true;
    }
    if (process.argv.includes("--dir")) {
        dir = process.argv[process.argv.indexOf("--dir") + 1];
    }
    const newProject = new CreateNewProject({ dir, force });

    newProject.startCreation();
} else if (!args) {
    console.log(HELP_RESPONSE);
}
