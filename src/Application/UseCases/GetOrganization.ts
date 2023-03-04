import OrganizationRepository from "../../Infrastructure/Repositories/OrganizationRepository";
import { IOrganizationRepository} from "../../Domain/Interfaces/IOrganizationRepository";
import {Organization} from "../../Domain/Entities/Organization";

export class GetOrganization {
    private organizationRepository: IOrganizationRepository;
    constructor(
        organizationRepository: IOrganizationRepository,
    ) {
        this.organizationRepository = organizationRepository;
    }

    public execute(organizationName: string): Promise<Organization> {
        return this.organizationRepository.get(organizationName);
    }
}
