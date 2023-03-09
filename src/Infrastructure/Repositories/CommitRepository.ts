import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";
import {Commit} from "../../Domain/Entities/Commit/Commit";
import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";
import CommitLinesStats from "../../Domain/Entities/Commit/CommitStats";

export default class CommitRepository implements ICommitRepository {
    private httpClient: HttpClientInterface;
    constructor(
        httpClient: HttpClientInterface,
    ) {
        this.httpClient = httpClient;
    }

    public async getByFilters(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<Commit[]> {
        const commitHashes = await this.getHashesByFilters(organization, repository, hash);
        const commits = [];
        for (const hash of commitHashes) {
            const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits/${hash}`);
            const commit = response.data;
            if (commit && commit.author && commit.author.login) {
                commits.push(
                    new Commit(
                        commit.sha,
                        commit.author.login,
                        repository,
                        commit.stats.additions,
                        commit.stats.deletions,
                    )
                );
            }
        }
        return commits;
    }

     public async getHashesByFilters(
         organization: string,
         repository: string,
         month: string,
     ): Promise<Commit[]> {
        const queryString = `?&since=${month}-01T00:00:00Z&`;
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits${queryString}`);
        const repositoryCommits= response.data;
        const commitHashes = [];
        repositoryCommits.forEach((commit) => {
            commitHashes.push(commit.sha);
        });
        return commitHashes;
    }
}
