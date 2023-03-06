import {GithubRepository} from "../Entities/GithubRepository";
import {Commit} from "../Entities/Commit/Commit";
import CommitLinesStats from "../Entities/Commit/CommitLinesStats";

export interface ICommitRepository {
    getByFilters(
        organization: string,
        repository: string,
        month: string,
    ): Promise<Commit[]>;

    getLineStatsByCommitHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<CommitLinesStats>;
}
