import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {Organization} from "../../Domain/Organization";
import {IGithubRepositoryRepository} from "../../Domain/Interfaces/IGithubRepositoryRepository";
import {GithubRepository} from "../../Domain/GithubRepository";
import GithubRepositoryMapper from "../Mappers/GithubRepositoryMapper";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";

export default class GithubRepositoryApiRepository implements IGithubRepositoryRepository {
    private httpClient: HttpClientInterface;
    private mapper: GithubRepositoryMapper;
    constructor(
        httpClient: HttpClientInterface,
        mapper: GithubRepositoryMapper,
    ) {
        this.httpClient = httpClient;
        this.mapper = mapper;
    }

     public async getByOrganizationName(name: string): Promise<GithubRepository[]> {
        const response = await this.httpClient.get(`/orgs/${name}/repos`);
        return this.mapper.mapResponseToDomain(response.data);
    }
}
