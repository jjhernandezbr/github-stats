import {GithubRepository} from "../Entities/GithubRepository";
import {Commit} from "../Entities/Commit/Commit";
import CommitLinesStats from "../Entities/Commit/CommitStats";

export interface ICommitLinesStatsRepository {
    getLineStatsByCommitHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<CommitLinesStats>;
}
