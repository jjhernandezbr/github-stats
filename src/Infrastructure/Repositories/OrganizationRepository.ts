import { AxiosHttpClient } from "../Clients/AxiosHttpClient";
import {Organization} from "../../Domain/Entities/Organization";
import {IOrganizationRepository} from "../../Domain/Interfaces/IOrganizationRepository";
import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import OrganizationMapper from "../Mappers/OrganizationMapper";

export default class OrganizationRepository implements IOrganizationRepository {
     public async get(name: string): Promise<Organization> {
        const client = new AxiosHttpClient();
        const response = await client.get(`/orgs/${name}/repos`);
        const data = response.data;
        const organization = new Organization(name ,new OrganizationMapper().mapResponseToDomain(data));
        console.log(organization);
        return organization;
    }
}
