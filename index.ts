import { GetGithubStatsByUser } from "./src/Application/UseCases/GetGithubStatsByUser"
import { AppDataSource } from "./src/data-source"
import * as dotenv from "dotenv";
dotenv.config();
const prompt = require('prompt-sync')({ sigint: true });

AppDataSource.initialize().then(async () => {
    const name = prompt('What is the user name? ');
    const month = prompt('What month (YYYY-MM): ');
    const organization = prompt('What is the organization name? ');

    await new GetGithubStatsByUser(name, month, organization).execute()

}).catch(error => console.log(error));

