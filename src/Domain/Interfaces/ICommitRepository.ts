import {GithubRepository} from "../Entities/GithubRepository";
import {Commit} from "../Entities/Commit/Commit";
import CommitLinesStats from "../Entities/Commit/CommitStats";

export interface ICommitRepository {
    getByFilters(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<Commit[]>

    getHashesByFilters(
        organization: string,
        repository: string,
        month: string,
    ): Promise<Commit[]>;

    getCommitCountByFilters(
        organization: string,
        userName: string,
        month: string,
    ): Promise<string>;
}
