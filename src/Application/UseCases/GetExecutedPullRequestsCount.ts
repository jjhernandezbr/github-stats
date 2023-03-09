import { IPullRequestRepository } from '../../Domain/Interfaces/IPullRequestRepository';

export class GetExecutedPullRequestsCount {
    userName: string;
    month: string;
    pullRequestRepository: IPullRequestRepository;
    constructor(userName: string, month: string, pullRequestRepository: IPullRequestRepository) {
        this.userName = userName;
        this.month = month;
        this.pullRequestRepository = pullRequestRepository;
    }

    public execute(): Promise<string> {
        return this.pullRequestRepository.asyncGetPullRequestsExecuted(this.userName, this.month);
    }
}
