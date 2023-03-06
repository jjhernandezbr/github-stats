import {Commit} from "../Entities/Commit/Commit";

export class CountCommitsByAuthorService {
    public execute(commitsArray: Commit[]): Commit[]
    {
        const commits = [];
        commitsArray.forEach((commit) => {
            if (commits[commit.getAuthor()] === undefined) {
                commits[commit.getAuthor()] = 0;
            }
            if (commits[commit.getAuthor()] !== undefined) {
                commits[commit.getAuthor()] = commits[commit.getAuthor()] + 1
            }
        })
        return commits;
    }
}
