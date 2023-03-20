import "reflect-metadata"
import { DataSource } from "typeorm"
import {UserActivityData} from "./Domain/UserActivityData";
import {UserActivityData1670708134504} from "../migrations/1670708134504-UserActivityData";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "githubstats",
    password: "githubstats",
    database: "githubstats",
    synchronize: true,
    logging: false,
    entities: [UserActivityData],
    migrations: [UserActivityData1670708134504],
    subscribers: [],
    multipleStatements: true
});
