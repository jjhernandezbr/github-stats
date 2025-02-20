import { ICommentsRepository } from "../../Domain/Interfaces/ICommentsRepository";
import {HttpClientInterface} from "../../Domain/Interfaces/HttpClientInterface";

export default class CommentsApiRepository implements ICommentsRepository {
    private httpClient: HttpClientInterface;
    constructor(
        httpClient: HttpClientInterface
    ) {
        this.httpClient = httpClient;
    }
    async asyncGetCommentsProm(userName: string, month: string): Promise<string[]> {
        const response = await this.httpClient.get(`/search/issues?q=type:pr+commenter:${userName}+created:${month}`);
        const data = response.data;
        let comments: string[] = [];
        for (var item of data.items) {
            const responseComments = await this.httpClient.get(item.comments_url.toString().replace("https://api.github.com", ""));
            if (typeof responseComments.data[0] != "undefined") {
                comments.push(responseComments.data[0].body);
                console.log("****---------------------------------****");
            }
        }
        return comments;
    }
}
