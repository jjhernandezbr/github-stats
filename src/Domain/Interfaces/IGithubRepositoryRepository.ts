import {GithubRepository} from "../Entities/GithubRepository";

export interface IGithubRepositoryRepository {
    getByOrganizationName(name: string): Promise<GithubRepository[]>;
}
