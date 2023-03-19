import CommentsRepository from "../../Infrastructure/Repositories/CommentsRepository";

export class GetCommentsLengthAverage {
    commentsRepository: CommentsRepository;
    constructor() {
        this.commentsRepository = new CommentsRepository;
    }
    public async execute(userName: string, month: string): Promise<string> {
        return await this.commentsRepository.asyncGetCommentsProm(userName, month);
    }
}
