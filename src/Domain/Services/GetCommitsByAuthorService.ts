import {Commit} from "../Entities/Commit/Commit";

export class GetCommitsByAuthorService {
    public execute(commitsArray: Commit[]): Commit[]
    {
        const commits = [];
        commitsArray.forEach((commit) => {
            if (commits[commit.getAuthor()] === undefined) {
                commits[commit.getAuthor()] = [commit];
            }
            if (commits[commit.getAuthor()] !== undefined) {
                commits[commit.getAuthor()].push(commit);
            }
        })
        return commits;
    }
}
