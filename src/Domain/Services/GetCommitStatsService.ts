import {Commit} from "../Commit";
import {ICommitRepository} from "../Interfaces/ICommitRepository";
import CommitStats from "../CommitStats";

export class GetCommitStatsService {
    private commits: Commit[];
    constructor(
        commits: Commit[],
    ) {
        this.commits = commits;
    }
    public execute(): Commit[]
    {
        let commitsByUser = [];
        this.commits.forEach((commit: Commit) => {
            if (commitsByUser[commit.getAuthor()] === undefined) {
                commitsByUser[commit.getAuthor()] = [];
                commitsByUser[commit.getAuthor()].push(commit);
            }
            if (commitsByUser[commit.getAuthor()] !== undefined) {
                commitsByUser[commit.getAuthor()].push(commit);
            }
        });
        const statsByUser = [];
        for (let user in commitsByUser) {
            statsByUser[user] = new CommitStats(commitsByUser[user]);
        }
        return statsByUser;
    }
}
