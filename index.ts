import { GetTotalAdditionsAndDeletions } from "./src/Application/UseCases/GetTotalAdditionsAndDeletions"
import { AppDataSource } from "./src/data-source"
import * as dotenv from "dotenv";
import {MySqlUserActivityDataRepository} from "./src/Infrastructure/Repositories/MySqlUserActivityDataRepository";
import {UserActivityData} from "./src/Domain/UserActivityData";
import {AxiosHttpClient} from "./src/Infrastructure/Clients/AxiosHttpClient";
import GithubRepositoryApiRepository from "./src/Infrastructure/Repositories/GithubRepositoryApiRepository";
import GithubRepositoryMapper from "./src/Infrastructure/Mappers/GithubRepositoryMapper";
import {GetRepositoriesByOrganizationService} from "./src/Domain/Services/GetRepositoriesByOrganizationService";
import CommitApiRepository from "./src/Infrastructure/Repositories/CommitApiRepository";
import PullRequestApiRepository from "./src/Infrastructure/Repositories/PullRequestApiRepository";
import {GetExecutedPullRequestsCount} from "./src/Application/UseCases/GetExecutedPullRequestsCount";
import {GetCommentsLengthAverage} from "./src/Application/UseCases/GetCommentsLengthAverage";
import CommentsApiRepository from "./src/Infrastructure/Repositories/CommentsApiRepository";
import { GetReviewedPullRequestsWithinOrganization } from "./src/Application/UseCases/GetReviewedPullRequestsWithinOrganization";
import {GenerateGithubStatsReport} from "./src/Application/UseCases/GenerateGithubStatsReport";
import {CsvGithubReportRepository} from "./src/Infrastructure/Repositories/CsvGithubReportRepository";
import {SaveUserActivityData} from "./src/Application/UseCases/SaveUserActivityData";
import {GetTotalCommitCount} from "./src/Application/UseCases/GetTotalCommitCount";
dotenv.config();
const prompt = require('prompt-sync')({ sigint: true });

AppDataSource.initialize().then(async () => {
    const name = prompt('What is the user name? ');
    const month = prompt('What month (YYYY-MM): ');
    const organization = prompt('What is the organization name? ');

    const mysqlRepository = new MySqlUserActivityDataRepository();
    let userActivityData: UserActivityData;
    const alreadyExists = await mysqlRepository.existsByUserNameMonthAndOrganization(
        name,
        month,
        organization
    );
    if (alreadyExists) {
        userActivityData = await mysqlRepository.findByUserNameMonthAndOrganization(
            name,
            month,
            organization
        );
    }
    if (!alreadyExists) {
        const axiosHttpClient = new AxiosHttpClient();
        const githubRepositoryRepository = new GithubRepositoryApiRepository(axiosHttpClient, new GithubRepositoryMapper());
        const commitRepository = new CommitApiRepository(axiosHttpClient);
        const pullRequestRepository = new PullRequestApiRepository(axiosHttpClient);
        const getRepositoriesByOrganizationService = new GetRepositoriesByOrganizationService(githubRepositoryRepository);

        const getTotalAdditionsAndDeletionsUseCase = new GetTotalAdditionsAndDeletions(githubRepositoryRepository, getRepositoriesByOrganizationService, commitRepository);
        const totalAdditionsAndDeletions = await getTotalAdditionsAndDeletionsUseCase.execute(organization, month, name);
        const executedPullRequestsCount = new GetExecutedPullRequestsCount(name, month, pullRequestRepository);
        const pullRequestsExecuted = await executedPullRequestsCount.execute();
        const commentLengthAverage = await new GetCommentsLengthAverage(new CommentsApiRepository(axiosHttpClient)).execute(name, month);
        const pullRequestsReviewedWithinOrganization = await new GetReviewedPullRequestsWithinOrganization(pullRequestRepository).execute(month, name, organization);
        const saveUserActivityDataUseCase = new SaveUserActivityData(new MySqlUserActivityDataRepository());
        const getCommitTotalCountUseCase = new GetTotalCommitCount(commitRepository);
        const totalCount = await getCommitTotalCountUseCase.execute(organization, month, name);
        userActivityData = new UserActivityData(
            name,
            month,
            organization,
            pullRequestsExecuted,
            totalAdditionsAndDeletions?.additions(),
            totalAdditionsAndDeletions?.deletions(),
            totalCount,
            commentLengthAverage,
            pullRequestsReviewedWithinOrganization,
        );
        saveUserActivityDataUseCase.execute(userActivityData);
    }

    console.log(userActivityData);
    const generateReportUseCase = new GenerateGithubStatsReport(new CsvGithubReportRepository());
    await generateReportUseCase.execute(userActivityData);
}).catch(error => console.log(error));

