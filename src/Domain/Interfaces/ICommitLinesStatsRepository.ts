import {GithubRepository} from "../GithubRepository";
import {Commit} from "../Commit";
import CommitLinesStats from "../CommitStats";

export interface ICommitLinesStatsRepository {
    getLineStatsByCommitHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<CommitLinesStats>;
}
