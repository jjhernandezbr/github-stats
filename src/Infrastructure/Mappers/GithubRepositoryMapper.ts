import {GithubRepository} from "../../Domain/GithubRepository";
import {Organization} from "../../Domain/Organization";

export default class GithubRepositoryMapper {
    public mapResponseToDomain(response): GithubRepository[] {
        const repositories = [];
        response.forEach((repo) => {
            repositories.push(new GithubRepository(repo.name, null));
        });
        return repositories;
    }
}
