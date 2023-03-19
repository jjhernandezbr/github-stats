import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {IPullRequestRepository} from "../../Domain/Interfaces/IPullRequestRepository";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";

export default class PullRequestRepository implements IPullRequestRepository{
    private httpClient: HttpClientInterface
    constructor(
        httpClient: HttpClientInterface
    ) {
        this.httpClient = httpClient;
    }
    public async asyncGetPullRequestsExecuted(userName: string, month: string): Promise<string> {
        const response = await this.httpClient.get(`/search/issues?q=type:pr+author:${userName}+created:${month}`);
        return response.data.total_count;
    }
}
