import { IGithubRepositoryRepository} from "../Interfaces/IGithubRepositoryRepository";
import {Organization} from "../Entities/Organization";
import {GithubRepository} from "../Entities/GithubRepository";

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
