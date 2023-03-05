import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import {Organization} from "../../Domain/Entities/Organization";

export default class OrganizationMapper {
    public mapResponseToDomain(response): GithubRepository[] {
        const repositories = [];
        response.forEach((repo) => {
            repositories.push(new GithubRepository(repo.id));
        });
        return repositories;
    }
}
