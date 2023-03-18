import CommentsRepository from "../../Infrastructure/Repositories/CommentsRepository";

export class GetCommentsReviews {
    commentsRepository: CommentsRepository;
    constructor() {
        this.commentsRepository = new CommentsRepository;
    }
    public async executed(userName: string, month: string): Promise<String> {
        return await this.commentsRepository.asyncGetCommentsProm(userName, month);
    }
}