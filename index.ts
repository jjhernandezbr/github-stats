import { GetExecutedPullRequestsCount } from "./src/Application/UseCases/GetExecutedPullRequestsCount";
import { GetGithubStatsByUser } from "./src/Application/UseCases/GetGithubStatsByUser"
import { AppDataSource } from "./src/data-source"
import * as yargs from 'yargs'
import { resolve } from "path";
import * as dotenv from "dotenv";
dotenv.config();
const prompt = require('prompt-sync')({ sigint: true });

AppDataSource.initialize().then(async () => { }).catch(error => console.log(error))

const name = prompt('What is your name? ');
const month = prompt('What month (YYYY-MM): ');
const organization = prompt('What is the organization name? ');

const executedGetGithubsStats = new GetGithubStatsByUser(name, month, organization);
executedGetGithubsStats.execute();

// const { argv } = yargs.option("userName", { describe: "GitHub user name" })
// const userName = argv["_"];
// console.log(argv["_"]);
// getPullRequest.syncGetUser(userName);

