export interface ICommentsRepository {
    asyncGetCommentsProm(userName: string, month: string): Promise<string[]>;
}
