import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserActivityData {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string
    @Column()
    month: string
    @Column()
    organization: string
    @Column()
    pullRequestsExecuted: string
    @Column()
    linesAdded: string
    @Column()
    linesDeleted: string
    @Column()
    commitCount: string
    @Column()
    commentLengthAverage: string
    constructor(
        name: string,
        month: string,
        organization: string,
        pullRequestsExecuted: string,
        linesAdded: string,
        linesDeleted: string,
        commitCount: string,
        commentLengthAverage: string,
    ) {
        this.name = name;
        this.month = month;
        this.organization = organization;
        this.pullRequestsExecuted = pullRequestsExecuted;
        this.linesAdded = linesAdded;
        this.linesDeleted = linesDeleted;
        this.commitCount = commitCount;
        this.commentLengthAverage = commentLengthAverage
    }
}
