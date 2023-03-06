import {GithubRepository} from "../GithubRepository";
import CommitLinesStats from "./CommitLinesStats";
import {User} from "../User";

export class Commit {
    private hash: string;
    private author: string;
    private repository: string;

    constructor(
        hash: string,
        author: string,
        repository: string
    ) {
        this.hash = hash;
        this.author = author;
        this.repository = repository;
    }

    public getHash(): string {
        return this.hash;
    }
    public getAuthor(): string {
        return this.author;
    };

    public getRepository(): string {
        return this.repository;
    }
}
