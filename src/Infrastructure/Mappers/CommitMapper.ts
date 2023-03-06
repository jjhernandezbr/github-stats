import {GithubRepository} from "../../Domain/Entities/GithubRepository";
import {Organization} from "../../Domain/Entities/Organization";
import {Commit} from "../../Domain/Entities/Commit/Commit";

export default class CommitMapper {
    public mapResponseToDomain(response, repository: string): Commit[] {
        const commits = [];
        response.forEach((commit) => {
            if (commit && commit.author && commit.author.login) {
                commits.push(new Commit(commit.sha, commit.author.login, repository));
            }
        });
        return commits;
    }
}
