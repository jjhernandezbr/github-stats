import CommentsApiRepository from "../../Infrastructure/Repositories/CommentsApiRepository";
import {ICommentsRepository} from "../../Domain/Interfaces/ICommentsRepository";

export class GetCommentsLengthAverage {
    commentsRepository: ICommentsRepository;
    constructor(
        commentsRepository: ICommentsRepository,
    ) {
        this.commentsRepository = commentsRepository;
    }
    public async execute(userName: string, month: string): Promise<string> {
        const comments = await this.commentsRepository.asyncGetCommentsProm(userName, month);
        let commentsLength = 0;
        for (const comment of comments) {
            commentsLength = commentsLength + comment.length;
        }
        const commentsLengthAverage = commentsLength !== 0 ? commentsLength / comments.length : 0;
        return commentsLengthAverage.toString();
    }
}
