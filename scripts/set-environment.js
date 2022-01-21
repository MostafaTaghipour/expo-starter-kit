#!/bin/node
const path = "../constants/env";
const fs = require("fs");
//Obtain the environment string passed to the node script
const environment = process.argv[2] || "prod";
//read the content of the json file
const envFileContent = require(`${path}/${environment}.json`);
//copy the json inside the env.json file
fs.writeFileSync(`_env.json`, JSON.stringify(envFileContent, undefined, 2));
