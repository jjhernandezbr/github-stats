import {Commit} from "./Commit";

export default class CommitStats {
    private readonly commits: Commit[];
    constructor(commits: Commit[]) {
        this.commits = commits;
    }

    public additions(): number {
        let total = 0;
        for (const commit of this.commits) {
            total = total + commit.additions();
        }
        return total;
    }

    public deletions(): number {
        let total = 0;
        for (const commit of this.commits) {
            total = total + commit.deletions();
        }
        return total;
    }

    public count(): number {
        return this.commits.length - 1;
    }
}
