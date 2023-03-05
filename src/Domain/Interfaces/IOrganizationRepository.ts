import {Organization} from "../Entities/Organization";

export interface IOrganizationRepository {
    get(name: string): Promise<Organization>;
}
