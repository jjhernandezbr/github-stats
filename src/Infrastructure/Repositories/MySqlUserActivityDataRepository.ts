import { AppDataSource } from "../../data-source";
import {UserActivityData} from "../../Domain/Entities/UserActivityData";
import {QueryBuilder} from "typeorm";

export class MySqlUserActivityDataRepository {
    repository = AppDataSource.getRepository(UserActivityData);
    public findByUserNameMonthAndOrganization
    (
        name: string,
        month: string,
        organization: string,
    ) {
        return this.repository.findOneBy({
            name: name,
            month: month,
            organization: organization,
        }).then((activityData) => {
            if (activityData !== null) {
                return new UserActivityData(
                    activityData.name,
                    activityData.month,
                    activityData.organization,
                    activityData.pullRequestsExecuted,
                    activityData.linesAdded,
                    activityData.linesDeleted,
                    activityData.commitCount,
                );
            }
        });
    }
    public async existsByUserNameMonthAndOrganization(
        name: string,
        month: string,
        organization: string,
    ): Promise<boolean> {
        return await this.repository.findOneBy({
            name: name,
            month: month,
            organization: organization,
        }).then((activityData) => {
            return activityData !== null
        });
    }
    public save(userActivityData: UserActivityData) {
        this.repository.save(userActivityData).then((activityData) => {
            return activityData;
        });
    }
}
