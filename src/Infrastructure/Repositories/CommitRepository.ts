import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";
import {Commit} from "../../Domain/Entities/Commit";
import {GithubRepository} from "../../Domain/Entities/GithubRepository";

export default class CommitRepository {
    private httpClient: HttpClientInterface;
    constructor(
        httpClient: HttpClientInterface
    ) {
        this.httpClient = httpClient;
    }

     async getByFilters(
         organization: string,
         repository: string,
         month: string,
         author: string,
     ): Promise<Commit[]> {
        const queryString = `?author=${author}&since=${month}-01T00:00:00Z`;
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits/${queryString}`);
        return response.data.total_count;
    }

    async getByHash(
        organization: string,
        repository: string,
        hash: string,
    ): Promise<Commit> {
        const response = await this.httpClient.get(`/repos/${organization}/${repository}/commits/${hash}`);
        return response.data.total_count;
    }
}
