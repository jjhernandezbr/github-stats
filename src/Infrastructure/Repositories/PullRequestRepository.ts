import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {IPullRequestRepository} from "../../Domain/Interfaces/IPullRequestRepository";

export default class PullRequestRepository implements IPullRequestRepository{
    public async asyncGetPullRequestsExecuted(userName: string, month: string): Promise<string> {
        const client = new AxiosHttpClient();
        const response = await client.get(`/search/issues?q=type:pr+author:${userName}+created:${month}`);
        return response.data.total_count;
    }
}
