import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";
import {Commit} from "../../Domain/Entities/Commit/Commit";
import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import CommitMapper from "../Mappers/CommitMapper";
import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";
import CommitLinesStats from "../../Domain/Entities/Commit/CommitLinesStats";

export default class CommitRepository implements ICommitRepository {
    private httpClient: HttpClientInterface;
    private mapper: CommitMapper;
    constructor(
        httpClient: HttpClientInterface,
        mapper: CommitMapper,
    ) {
        this.httpClient = httpClient;
        this.mapper = mapper;
    }

     async getByFilters(
         organization: string,
         repository: string,
         month: string,
     ): Promise<Commit[]> {
        const queryString = `?&since=${month}-01T00:00:00Z`;
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits${queryString}`);
        return this.mapper.mapResponseToDomain(response.data, repository);
    }

    async getLineStatsByCommitHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<CommitLinesStats> {
        return await this.httpClient.get(`/repos/${organization}/${repository}/commits/${hash}`);
    }
}
