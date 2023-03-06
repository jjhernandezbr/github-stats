export default class CommitLinesStats {
    private additions: number;
    private deletions: number;
    constructor(additions: number, deletions: number) {
        this.additions = additions;
        this.deletions = deletions;
    }
}
