import { GetExecutedPullRequestsCount } from "./GetExecutedPullRequestsCount";
import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { CsvRepositoryImpl } from "../../Infrastructure/Repositories/CsvRepository";
import { GetRepositoriesByOrganizationService } from "../../Domain/Services/GetRepositoriesByOrganizationService";
import GithubRepositoryRepository from "../../Infrastructure/Repositories/GithubRepositoryRepository";
import { AxiosHttpClient } from "../../Infrastructure/Clients/AxiosHttpClient";
import GithubRepositoryMapper from "../../Infrastructure/Mappers/GithubRepositoryMapper";
import CommitRepository from "../../Infrastructure/Repositories/CommitRepository";
import { CountCommitsByAuthorService } from "../../Domain/Services/CountCommitsByAuthorService";
import { OrderCommitStatsByAuthorService } from "../../Domain/Services/OrderCommitStatsByAuthorService";
import PullRequestRepository from "../../Infrastructure/Repositories/PullRequestRepository";

export class GetGithubStatsByUser {
    userActivityData = new UserActivityData();
    constructor(userName: string, month: string, organization: string) {
        this.userActivityData.name = userName;
        this.userActivityData.month = month;
        this.userActivityData.organization = organization;
    }

    public async execute(): Promise<void> {
        const githubRepositoryRepository = new GithubRepositoryRepository(new AxiosHttpClient(), new GithubRepositoryMapper());
        const organizationGithubRepositories = await new GetRepositoriesByOrganizationService(githubRepositoryRepository).execute(this.userActivityData.organization);
        const commitRepository = new CommitRepository(new AxiosHttpClient());
        let commits = [];
        for (const repository of organizationGithubRepositories) {
            const repositoryCommits = await commitRepository.getByFilters(this.userActivityData.organization, repository.getName(), this.userActivityData.month);
            Array.prototype.push.apply(commits, repositoryCommits);
        }
        // de momento no se usa const commitCount = new CountCommitsByAuthorService().execute(commits);
        const commitStatsByAuthor = new OrderCommitStatsByAuthorService(commits).execute();
        const executedPullRequestsCount = new GetExecutedPullRequestsCount(this.userActivityData.name, this.userActivityData.month, new PullRequestRepository());
        this.userActivityData.pullRequestsExecuted = await executedPullRequestsCount.execute();
        const commitStats = commitStatsByAuthor[this.userActivityData.name];
        console.log('');
        console.log(`user name: ${this.userActivityData.name}`);
        console.log(`month: ${this.userActivityData.month}`);
        console.log('pull requests count: ' + this.userActivityData.pullRequestsExecuted);
        console.log('additions:' + commitStats.additions());
        console.log('deletions:' + commitStats.deletions());
        console.log('commit count:' + commitStats.count());
        this.userActivityData.linesAdded = commitStats.additions();
        this.userActivityData.linesDeleted = commitStats.deletions();
        this.userActivityData.commitCount = commitStats.count();
        const csvRepository = new CsvRepositoryImpl("report.csv", ["name", "month", "organization", "pullRequestsExecuted", "linesAdded", "linesDeleted", "commitCount"]);
        await csvRepository.create(this.userActivityData);
    }
}
