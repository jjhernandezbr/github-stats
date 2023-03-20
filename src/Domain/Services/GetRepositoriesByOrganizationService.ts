import { IGithubRepositoryRepository} from "../Interfaces/IGithubRepositoryRepository";
import {Organization} from "../Organization";
import {GithubRepository} from "../GithubRepository";

export class GetRepositoriesByOrganizationService {
    private githubRepositoryRepository: IGithubRepositoryRepository;
    constructor(
        organizationRepository: IGithubRepositoryRepository,
    ) {
        this.githubRepositoryRepository = organizationRepository;
    }

    public execute(organizationName: string): Promise<GithubRepository[]> {
        return this.githubRepositoryRepository.getByOrganizationName(organizationName);
    }
}
