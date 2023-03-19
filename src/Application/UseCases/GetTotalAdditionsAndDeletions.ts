import { GetRepositoriesByOrganizationService } from "../../Domain/Services/GetRepositoriesByOrganizationService";
import { GetCommitStatsService } from "../../Domain/Services/GetCommitStatsService";
import {IGithubRepositoryRepository} from "../../Domain/Interfaces/IGithubRepositoryRepository";
import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";
import CommitStats from "../../Domain/Entities/Commit/CommitStats";

export class GetTotalAdditionsAndDeletions {
    private readonly githubRepositoryRepository: IGithubRepositoryRepository;
    private readonly getRepositoriesByOrganizationService: GetRepositoriesByOrganizationService;
    private readonly commitRepository: ICommitRepository;

    constructor(
        githubRepositoryRepository: IGithubRepositoryRepository,
        getRepositoriesByOrganizationService: GetRepositoriesByOrganizationService,
        commitRepository: ICommitRepository,
    ) {
        this.githubRepositoryRepository = githubRepositoryRepository;
        this.getRepositoriesByOrganizationService = getRepositoriesByOrganizationService;
        this.commitRepository = commitRepository;
    }

    public async execute(organization: string, month: string, userName: string): Promise<CommitStats> {
        const organizationGithubRepositories = await this.getRepositoriesByOrganizationService.execute(organization);
        let commits = [];
        for (const repository of organizationGithubRepositories) {
            const repositoryCommits = await this.commitRepository.getByFilters(organization, repository.getName(), month);
            Array.prototype.push.apply(commits, repositoryCommits);
        }
        return new GetCommitStatsService(commits).execute()[userName];
    }
}
