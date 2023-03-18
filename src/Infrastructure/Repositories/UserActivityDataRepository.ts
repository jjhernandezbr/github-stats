import { AppDataSource } from "../../data-source";
import { UserActivityData } from "../../Domain/Entities/UserActivityData";

export class UserActivityDataRepository {
    repository = AppDataSource.getRepository(UserActivityData);
    public get() {
        return this.repository.find().then((activityData) => {
            return activityData;
        });
    }
    public save(pullRequestsExecuted: string) {
        const userActivityData = new UserActivityData()
        userActivityData.pullRequestsExecuted = pullRequestsExecuted;
        this.repository.save(userActivityData).then((activityData) => {
            return activityData;
        });
    }
}
