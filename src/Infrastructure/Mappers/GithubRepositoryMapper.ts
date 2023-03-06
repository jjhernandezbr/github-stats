import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import {Organization} from "../../Domain/Entities/Organization";

export default class GithubRepositoryMapper {
    public mapResponseToDomain(response): GithubRepository[] {
        const repositories = [];
        response.forEach((repo) => {
            repositories.push(new GithubRepository(repo.name, null));
        });
        return repositories;
    }
}
