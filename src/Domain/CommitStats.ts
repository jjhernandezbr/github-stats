import {Commit} from "./Commit";

export default class CommitStats {
    private readonly commits: Commit[];
    constructor(commits: Commit[]) {
        this.commits = commits;
    }

    public additions(): string {
        let total = 0;
        if (this.commits.length !== 0) {
            for (const commit of this.commits) {
                total = total + commit.additions();
            }
            return total.toString();
        }
    }

    public deletions(): string {
        let total = 0;
        if (this.commits.length !== 0) {
            for (const commit of this.commits) {
                total = total + commit.deletions();
            }
        }
        return total.toString();
    }
}
