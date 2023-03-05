import {GithubRepository} from "./GithubRepository";

export class Commit {
    private hash: string;
    private additions: number;
    private deletions: number;

    constructor(
        hash: string,
        additions: number,
        deletions: number,
    ) {
        this.hash = hash;
        this.additions = additions;
        this.deletions = deletions
    }
}
