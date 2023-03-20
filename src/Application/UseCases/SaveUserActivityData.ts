import {UserActivityData} from "../../Domain/UserActivityData";
import {IUserActivityDataRepository} from "../../Domain/Interfaces/IUserActivityDataRepository";

export class SaveUserActivityData {
    private userActivityDataRepository: IUserActivityDataRepository
    constructor(
        userActivityDataRepository: IUserActivityDataRepository
    ) {
        this.userActivityDataRepository = userActivityDataRepository;
    }

    public execute(userActivityData: UserActivityData): void
    {
        return this.userActivityDataRepository.save(userActivityData);
    }
}
