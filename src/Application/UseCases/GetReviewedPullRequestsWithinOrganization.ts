import {IPullRequestRepository} from "../../Domain/Interfaces/IPullRequestRepository";

export class GetReviewedPullRequestsWithinOrganization
{
    private pullRequestRepository: IPullRequestRepository;
    constructor(
        pullRequestRepository: IPullRequestRepository
    ) {
        this.pullRequestRepository = pullRequestRepository;
    }

    public execute(month: string, reviewer: string, organization: string): Promise<string>
    {
        return this.pullRequestRepository.getPullRequestReviewsCountByFilters(month, reviewer, organization);
    }

}
