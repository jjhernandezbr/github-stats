import {Commit} from "./Commit/Commit";

export class GithubRepository {
    private readonly name: string;
    private readonly commits: Commit[]|null;
    constructor (name: string, commits: Commit[]|null = null) {
        this.name = name;
        this.commits = commits;
    }

    public getName(): string
    {
        return this.name;
    }
}
