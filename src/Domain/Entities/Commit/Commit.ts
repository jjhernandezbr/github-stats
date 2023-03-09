import {GithubRepository} from "../GithubRepository";
import CommitLinesStats from "./CommitStats";
import {User} from "../User";

export class Commit {
    private readonly hash: string;
    private readonly author: string;
    private readonly repository: string;
    private readonly linesAdded: number;
    private readonly linesDeleted: number;

    constructor(
        hash: string,
        author: string,
        repository: string,
        linesAdded: number,
        linesDeleted: number,
    ) {
        this.hash = hash;
        this.author = author;
        this.repository = repository;
        this.linesAdded = linesAdded;
        this.linesDeleted = linesDeleted;
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
    public additions(): number {
        return this.linesAdded;
    };
    public deletions(): number {
        return this.linesDeleted;
    };
}
