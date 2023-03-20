import {GithubRepository} from "./GithubRepository";

export class Organization {
    private name: string;
    private readonly repositories: GithubRepository[];

    constructor(
        name: string,
        repositories: GithubRepository[]
    ) {
        this.name = name;
        this.repositories = repositories;
    }

    public getRepositories(): GithubRepository[] {
        return this.repositories;
    }
}
