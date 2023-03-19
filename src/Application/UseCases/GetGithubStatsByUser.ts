import { GetExecutedPullRequestsCount } from "./GetExecutedPullRequestsCount";
import { UserActivityData } from "../../Domain/Entities/UserActivityData";
import { CsvGithubReportRepository } from "../../Infrastructure/Repositories/CsvRepository";
import { GetRepositoriesByOrganizationService } from "../../Domain/Services/GetRepositoriesByOrganizationService";
import GithubRepositoryApiRepository from "../../Infrastructure/Repositories/GithubRepositoryApiRepository";
import { AxiosHttpClient } from "../../Infrastructure/Clients/AxiosHttpClient";
import GithubRepositoryMapper from "../../Infrastructure/Mappers/GithubRepositoryMapper";
import CommitApiRepository from "../../Infrastructure/Repositories/CommitApiRepository";
import { OrderCommitStatsByAuthorService } from "../../Domain/Services/OrderCommitStatsByAuthorService";
import PullRequestApiRepository from "../../Infrastructure/Repositories/PullRequestApiRepository";
import {MySqlUserActivityDataRepository} from "../../Infrastructure/Repositories/MySqlUserActivityDataRepository";
import {GetCommentsLengthAverage} from "./GetCommentsLengthAverage";
import CommentsApiRepository from "../../Infrastructure/Repositories/CommentsApiRepository";

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
            const axiosHttpClient = new AxiosHttpClient();
            const githubRepositoryRepository = new GithubRepositoryApiRepository(axiosHttpClient, new GithubRepositoryMapper());
            const organizationGithubRepositories = await new GetRepositoriesByOrganizationService(githubRepositoryRepository).execute(this.organization);
            const commitRepository = new CommitApiRepository(axiosHttpClient);
            let commits = [];
            for (const repository of organizationGithubRepositories) {
                const repositoryCommits = await commitRepository.getByFilters(this.organization, repository.getName(), this.month);
                Array.prototype.push.apply(commits, repositoryCommits);
            }
            // de momento no se usa const commitCount = new CountCommitsByAuthorService().execute(commits);
            const commitStatsByAuthor = new OrderCommitStatsByAuthorService(commits).execute();
            const executedPullRequestsCount = new GetExecutedPullRequestsCount(this.name, this.month, new PullRequestApiRepository(axiosHttpClient));
            const pullRequestsExecuted = await executedPullRequestsCount.execute();
            const commitStats = commitStatsByAuthor[this.name];
            const commentLengthAverage = await new GetCommentsLengthAverage(new CommentsApiRepository(axiosHttpClient)).execute(this.name, this.month);
            userActivityData = new UserActivityData(
                this.name,
                this.month,
                this.organization,
                pullRequestsExecuted,
                commitStats?.additions() ?? 0,
                commitStats?.deletions() ?? 0,
                commitStats?.count() ?? 0,
                commentLengthAverage,
            );
            mysqlRepository.save(userActivityData);
        }

        console.log(userActivityData);
        const csvRepository = new CsvGithubReportRepository("report.csv", ["name", "month", "organization", "pullRequestsExecuted", "linesAdded", "linesDeleted", "commitCount"]);
        await csvRepository.create(userActivityData);
    }
}
