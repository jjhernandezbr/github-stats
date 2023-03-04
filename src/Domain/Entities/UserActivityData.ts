import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserActivityData {
    @PrimaryGeneratedColumn()
    id: number
    name: string
    month: string
    @Column()
    pullRequestsExecuted: string
}
