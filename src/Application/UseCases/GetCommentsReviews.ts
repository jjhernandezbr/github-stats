import CommentsRepository from "../../Infrastructure/Repositories/CommentsRepository";

export class GetCommentsReviews {
    commentsRepository: CommentsRepository;
    constructor() {
        this.commentsRepository = new CommentsRepository;
    }
    public executed(userName: string, month: string): Promise<String> {
        return this.commentsRepository.asyncGetCommentsProm(userName, month);
    }
}