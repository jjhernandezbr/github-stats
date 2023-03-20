import {Commit} from "../Commit";

export class CountCommitsByAuthorService {
    public execute(commitsArray: Commit[]): number[]
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
