import {GithubRepository} from "../GithubRepository";

export interface IGithubRepositoryRepository {
    getByOrganizationName(name: string): Promise<GithubRepository[]>;
}
