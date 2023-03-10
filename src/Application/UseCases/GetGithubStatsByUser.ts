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
import {MySqlUserActivityDataRepository} from "../../Infrastructure/Repositories/MySqlUserActivityDataRepository";

export class GetGithubStatsByUser {
    private readonly name: string;
    private readonly month: string;
    private readonly organization: string;
    constructor(userName: string, month: string, organization: string) {
        this.name = userName;
        this.month = month;
        this.organization = organization;
    }

    public async execute(): Promise<void> {
        const mysqlRepository = new MySqlUserActivityDataRepository();
        let userActivityData: UserActivityData;
        const alreadyExists = await mysqlRepository.existsByUserNameMonthAndOrganization(
            this.name,
            this.month,
            this.organization
        );
        if (alreadyExists) {
            userActivityData = await mysqlRepository.findByUserNameMonthAndOrganization(
                this.name,
                this.month,
                this.organization
            );
        }
        if (!alreadyExists) {
            const githubRepositoryRepository = new GithubRepositoryRepository(new AxiosHttpClient(), new GithubRepositoryMapper());
            const organizationGithubRepositories = await new GetRepositoriesByOrganizationService(githubRepositoryRepository).execute(this.organization);
            const commitRepository = new CommitRepository(new AxiosHttpClient());
            let commits = [];
            for (const repository of organizationGithubRepositories) {
                const repositoryCommits = await commitRepository.getByFilters(this.organization, repository.getName(), this.month);
                Array.prototype.push.apply(commits, repositoryCommits);
            }
            // de momento no se usa const commitCount = new CountCommitsByAuthorService().execute(commits);
            const commitStatsByAuthor = new OrderCommitStatsByAuthorService(commits).execute();
            const executedPullRequestsCount = new GetExecutedPullRequestsCount(this.name, this.month, new PullRequestRepository());
            const pullRequestsExecuted = await executedPullRequestsCount.execute();
            const commitStats = commitStatsByAuthor[this.name];
            userActivityData = new UserActivityData(
                this.name,
                this.month,
                this.organization,
                pullRequestsExecuted,
                commitStats.additions(),
                commitStats.deletions(),
                commitStats.count(),
            )
            mysqlRepository.save(userActivityData);
        }

        console.log(userActivityData);
        const csvRepository = new CsvRepositoryImpl("report.csv", ["name", "month", "organization", "pullRequestsExecuted", "linesAdded", "linesDeleted", "commitCount"]);
        await csvRepository.create(userActivityData);
    }
}
