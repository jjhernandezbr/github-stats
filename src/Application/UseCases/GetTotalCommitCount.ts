import {ICommitRepository} from "../../Domain/Interfaces/ICommitRepository";

export class GetTotalCommitCount {
    private commitRepository: ICommitRepository;
    constructor(
        commitRepository: ICommitRepository,
    ) {
        this.commitRepository = commitRepository;
    }

    public async execute(organization: string, month: string, userName: string): Promise<string>
    {
        return await this.commitRepository.getCommitCountByFilters(organization, userName, month);
    }
}
