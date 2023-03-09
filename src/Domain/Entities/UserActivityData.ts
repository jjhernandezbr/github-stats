import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserActivityData {
    @PrimaryGeneratedColumn()
    id: number
    name: string
    month: string
    organization: string
    @Column()
    pullRequestsExecuted: string
    linesAdded: string
    linesDeleted: string
    commitCount: string
}
