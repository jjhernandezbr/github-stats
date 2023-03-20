import {GithubRepository} from "../GithubRepository";
import {Commit} from "../Commit";
import CommitLinesStats from "../CommitStats";

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
