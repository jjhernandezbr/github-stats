import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class UserActivityData1670708134504 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_activity_data",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "month",
                        type: "varchar",
                    },
                    {
                        name: "organization",
                        type: "varchar",
                    },
                    {
                        name: "pullRequestsExecuted",
                        type: "varchar",
                    },
                    {
                        name: "linesAdded",
                        type: "varchar",
                    },
                    {
                        name: "linesDeleted",
                        type: "varchar",
                    },
                    {
                        name: "commitCount",
                        type: "varchar",
                    },
                    {
                        name: "commentLengthAverage",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_activity_data")
    }

}
