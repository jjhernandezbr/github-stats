import CommentsRepository from "../../Infrastructure/Repositories/CommentsRepository";
import {ICommentsRepository} from "../../Domain/Interfaces/ICommentsRepository";

export class GetCommentsLengthAverage {
    commentsRepository: ICommentsRepository;
    constructor(
        commentsRepository: ICommentsRepository,
    ) {
        this.commentsRepository = commentsRepository;
    }
    public async execute(userName: string, month: string): Promise<string> {
        return await this.commentsRepository.asyncGetCommentsProm(userName, month);
    }
}
