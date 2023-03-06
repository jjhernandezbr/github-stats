import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";
import {Commit} from "../../Domain/Entities/Commit/Commit";
import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import CommitMapper from "../Mappers/CommitMapper";
import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";
import CommitLinesStats from "../../Domain/Entities/Commit/CommitLinesStats";
import {ICommitLinesStatsRepository} from "../../Domain/Interfaces/ICommitLinesStatsRepository";

export default class CommitLinesStatsRepository implements ICommitLinesStatsRepository {
    private httpClient: HttpClientInterface;
    private mapper: CommitMapper;
    constructor(
        httpClient: HttpClientInterface,
        mapper: CommitMapper,
    ) {
        this.httpClient = httpClient;
        this.mapper = mapper;
    }

    async getLineStatsByCommitHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<CommitLinesStats> {
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits/${hash}`);
        console.log(response);
        return response;
    }
}
