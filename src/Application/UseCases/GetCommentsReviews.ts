import CommentsApiRepository from "../../Infrastructure/Repositories/CommentsApiRepository";

export class GetCommentsReviews {
    commentsRepository: CommentsApiRepository;
    constructor() {
        this.commentsRepository = new CommentsApiRepository;
    }
    public async executed(userName: string, month: string): Promise<String> {
        return await this.commentsRepository.asyncGetCommentsProm(userName, month);
    }
}
