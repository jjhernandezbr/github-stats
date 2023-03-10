import {GithubRepository} from "../Entities/GithubRepository";
import {Commit} from "../Entities/Commit/Commit";
import CommitLinesStats from "../Entities/Commit/CommitStats";
import {UserActivityData} from "../Entities/UserActivityData";

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
