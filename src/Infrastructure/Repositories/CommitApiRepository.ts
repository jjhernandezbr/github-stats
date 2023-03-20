import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";
import {Commit} from "../../Domain/Commit";
import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";
import moment from "moment";

export default class CommitApiRepository implements ICommitRepository {
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
        // mover a un Value Object
        const startMonth = moment(month).toISOString();
        const endMonth = moment(month).add(1, 'months').toISOString();
        const formattedStartMonth = startMonth.substring(0,19) + startMonth.substring(23, 24);
        const formattedEndMonth = endMonth.substring(0,19) + endMonth.substring(23, 24);
        const queryString = `?since=${formattedStartMonth}&until=${formattedEndMonth}`;
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits${queryString}`);
        const repositoryCommits= response.data;
        const commitHashes = [];
        repositoryCommits.forEach((commit) => {
            commitHashes.push(commit.sha);
        });
        return commitHashes;
    }

    public async getCommitCountByFilters(
        organization: string,
        userName: string,
        month: string,
    ): Promise<string> {
        const queryString = `author-date:${month}+org:${organization}+author:${userName}`;
        const endpoint = `/search/commits?q=${queryString}`;
        const response = await this.httpClient.get(endpoint);
        return response.data.total_count;
    }
}
