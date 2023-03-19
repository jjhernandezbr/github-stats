
export interface IPullRequestRepository {
  asyncGetPullRequestsExecuted(userName: string, month: string): Promise<string>;
  getPullRequestReviewsCountByFilters(month: string, reviewer: string, organization: string|null): Promise<string>
}
