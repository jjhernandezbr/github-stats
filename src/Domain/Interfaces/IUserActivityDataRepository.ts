import {GithubRepository} from "../GithubRepository";
import {Commit} from "../Commit";
import CommitLinesStats from "../CommitStats";
import {UserActivityData} from "../UserActivityData";

export interface IUserActivityDataRepository {
    findByUserNameMonthAndOrganization(
        name: string,
        month: string,
        organization: string,
    ): Promise<UserActivityData>;

    existsByUserNameMonthAndOrganization(
        name: string,
        month: string,
        organization: string,
)   : Promise<boolean>;

    save(userActivityData: UserActivityData): void;
}
