import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { IGithubReportRepository } from "../../Domain/Interfaces/IGithubReportRepository";
const fs = require('fs');
const csv = require('csv-parse');
import * as fastcsv from 'fast-csv';

export class CsvGithubReportRepository<T> implements IGithubReportRepository<T> {
    private readonly filename: string;
    private readonly columns: string[];

    constructor(filename: string, columns: string[]) {
        this.filename = filename;
        this.columns = columns;
    }

    async findAll(): Promise<T[]> {
        const results: T[] = [];
        const parser = fs.createReadStream(this.filename).pipe(csv({ columns: true }));
        for await (const record of parser) {
            results.push(record as T);
        }
        return results;
    }

    async create(UserActivityData: UserActivityData): Promise<void> {
        const rows = [
            {
                name: UserActivityData.name,
                month: UserActivityData.month,
                pullRequesteExecuted: UserActivityData.pullRequestsExecuted,
                linesAdded: UserActivityData.linesAdded,
                linesDeleted: UserActivityData.linesDeleted,
                commitsCount: UserActivityData.commitCount,
            },
        ];
        const stream = fs.createWriteStream(this.filename, { flags: 'a' });
        fastcsv.write(rows, { headers: true }).pipe(stream);
        return;
    }
}
