import { GetExecutedPullRequestsCount } from "./GetExecutedPullRequestsCount";
import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { CsvRepositoryImpl } from "../../Infrastructure/Repositories/CsvRepository";
import {GetRepositoriesByOrganizationService} from "../../Domain/Services/GetRepositoriesByOrganizationService";
import GithubRepositoryRepository from "../../Infrastructure/Repositories/GithubRepositoryRepository";
import {AxiosHttpClient} from "../../Infrastructure/Clients/AxiosHttpClient";
import GithubRepositoryMapper from "../../Infrastructure/Mappers/GithubRepositoryMapper";
import CommitRepository from "../../Infrastructure/Repositories/CommitRepository";
import CommitMapper from "../../Infrastructure/Mappers/CommitMapper";
import {CountCommitsByAuthorService} from "../../Domain/Services/CountCommitsByAuthorService";
import CommitLinesStatsRepository from "../../Infrastructure/Repositories/CommitLinesStatsRepository";
import {GetCommitsByAuthorService} from "../../Domain/Services/GetCommitsByAuthorService";
import CommitLinesStats from "../../Domain/Entities/Commit/CommitLinesStats";

export class GetGithubStatsByUser {
    userActivityData = new UserActivityData();
    constructor(userName: string, month: string, organization: string) {
        this.userActivityData.name = userName;
        this.userActivityData.month = month;
        this.userActivityData.organization = organization;
    }

    public async execute(): Promise<void> {
        const githubRepositoryRepository = new GithubRepositoryRepository(new AxiosHttpClient(), new GithubRepositoryMapper());
        const organizationRepositories = await new GetRepositoriesByOrganizationService(githubRepositoryRepository).execute(this.userActivityData.organization);
        const commitRepository = new CommitRepository(new AxiosHttpClient(), new CommitMapper());
        let commits = [];
        for (const repository of organizationRepositories) {
            const repositoryCommits = await commitRepository.getByFilters(this.userActivityData.organization, repository.getName(), this.userActivityData.month);
            Array.prototype.push.apply(commits, repositoryCommits);
        }
        const commitCount = new CountCommitsByAuthorService().execute(commits);
        const commitsByAuthor = new GetCommitsByAuthorService().execute(commits);
        const executedPullRequestsCount = new GetExecutedPullRequestsCount(this.userActivityData.name, this.userActivityData.month);
        this.userActivityData.pullRequestsExecuted = await executedPullRequestsCount.execute();
        console.log(this.userActivityData.pullRequestsExecuted);
        const csvRepository = new CsvRepositoryImpl("report.csv", ["id", "name", "month", "organization", "pullRequestsExecuted"]);
        csvRepository.create(this.userActivityData);
    }

}
