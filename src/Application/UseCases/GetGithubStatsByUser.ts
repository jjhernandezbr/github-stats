import { GetExecutedPullRequestsCount } from "./GetExecutedPullRequestsCount";
import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { ICsvRepository } from "../../Domain/Interfaces/ICsvRepository";
import { CsvRepositoryImpl } from "../../Infrastructure/Repositories/CsvRepository";

export class GetGithubStatsByUser {
    userActivityData = new UserActivityData();
    constructor(userName: string, month: string) {
        this.userActivityData.name = userName;
        this.userActivityData.month = month;
    }

    public async execute(): Promise<void> {
        const executedPullRequestsCount = new GetExecutedPullRequestsCount(this.userActivityData.name, this.userActivityData.month);
        this.userActivityData.pullRequestsExecuted = await executedPullRequestsCount.execute();
        console.log(this.userActivityData.pullRequestsExecuted);
        const csvRepository = new CsvRepositoryImpl("report.csv", ["id", "name", "month", "pullRequestsExecuted"]);
        csvRepository.create(this.userActivityData);
    }

}
