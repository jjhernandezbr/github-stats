import {GithubRepository} from "./GithubRepository";

export class Organization {
    private name: string;
    private repositories: GithubRepository[];

    constructor(
        name: string,
        repositories: GithubRepository[]
    ) {
        this.name = name;
        this.repositories = repositories;
    }
}
