import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import { ICommentsRepository } from "../../Domain/Interfaces/ICommentsRepository";
const moment = require('moment');


export default class CommentsRepository implements ICommentsRepository {
    async asyncGetCommentsProm(userName: string, month: string): Promise<string> {
        const client = new AxiosHttpClient();
        const response = await client.get(`/search/issues?q=type:pr+commenter:${userName}+created:${month}`);
        const data = response.data;
        //console.log(response.data.items[0].comments_url.toString());
        data.items.forEach(async item => {
            const responseComments = await client.get(item.comments_url.toString().replace("https://api.github.com", ""));
            console.log(responseComments.data[0]);
            console.log("****---------------------------------****");
        });
        const reviewComments = data.items ? data.items.filter(item => item.comments_url) : [];
        return reviewComments;
    }
}