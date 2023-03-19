import {IGithubReportRepository} from "../../Domain/Interfaces/IGithubReportRepository";
import {UserActivityData} from "../../Domain/Entities/UserActivityData";

export class GenerateGithubStatsReport {
    private csvGithubStatsReportRepository: IGithubReportRepository<any>
    constructor(
        csvGithubStatsReportRepository: IGithubReportRepository<any>
    ) {
        this.csvGithubStatsReportRepository = csvGithubStatsReportRepository;
    }

    public execute(userActivityData: UserActivityData): Promise<void>
    {
        return this.csvGithubStatsReportRepository.create(userActivityData);
    }
}
