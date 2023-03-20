import { AppDataSource } from "../../data-source";
import {UserActivityData} from "../../Domain/UserActivityData";
import {IUserActivityDataRepository} from "../../Domain/Interfaces/IUserActivityDataRepository";

export class MySqlUserActivityDataRepository implements IUserActivityDataRepository{
    public findByUserNameMonthAndOrganization(
        name: string,
        month: string,
        organization: string,
    ): Promise<UserActivityData> {
        const dataSource = AppDataSource.getRepository(UserActivityData);
        return dataSource.findOneBy({
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
                    activityData.commentLengthAverage,
                    activityData.pullRequestsReviewed,
                );
            }
        });
    }
    public async existsByUserNameMonthAndOrganization(
        name: string,
        month: string,
        organization: string,
    ): Promise<boolean> {
        const dataSource = AppDataSource.getRepository(UserActivityData);
        return await dataSource.findOneBy({
            name: name,
            month: month,
            organization: organization,
        }).then((activityData) => {
            return activityData !== null
        });
    }
    public save(userActivityData: UserActivityData):void {
        const dataSource = AppDataSource.getRepository(UserActivityData);
        dataSource.save(userActivityData).then((activityData) => {
            return activityData;
        });
    }
}
