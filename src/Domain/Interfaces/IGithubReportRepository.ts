import { UserActivityData } from "../UserActivityData";

export interface IGithubReportRepository<T> {
  findAll(): Promise<T[]>;
  create(userActivityData: UserActivityData): Promise<void>;
}
