import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {IPullRequestRepository} from "../../Domain/Interfaces/IPullRequestRepository";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";

export default class PullRequestApiRepository implements IPullRequestRepository{
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

    public async getPullRequestReviewsCountByFilters(month: string, reviewer: string, organization: string|null): Promise<string>{
        let query = `created:${month}+type:pr+reviewed-by:${reviewer}`;
        if (organization !== null) {
            query =  `${query}+org:${organization}`
        }
        const endpoint = `/search/issues?q=${query}`
        const response = await this.httpClient.get(endpoint);
        return response.data.total_count;
    }
}
