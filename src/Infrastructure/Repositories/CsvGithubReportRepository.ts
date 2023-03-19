import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { IGithubReportRepository } from "../../Domain/Interfaces/IGithubReportRepository";
const fs = require('fs');
const csv = require('csv-parse');
import * as fastcsv from 'fast-csv';

export class CsvGithubReportRepository<T> implements IGithubReportRepository<T> {
    async findAll(): Promise<T[]> {
        const results: T[] = [];
        const parser = fs.createReadStream("report.csv").pipe(csv({ columns: true }));
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
                pullRequestsExecuted: UserActivityData.pullRequestsExecuted,
                linesAdded: UserActivityData.linesAdded,
                linesDeleted: UserActivityData.linesDeleted,
                commitsCount: UserActivityData.commitCount,
                commentLengthAverage: UserActivityData.commentLengthAverage,
                pullRequestsReviewed: UserActivityData.pullRequestsReviewed,
            },
        ];
        const stream = fs.createWriteStream("report.csv", { flags: 'a' });
        fastcsv.write(rows, { headers: true }).pipe(stream);
        return;
    }
}
