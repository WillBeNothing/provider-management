import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProviders1613775263972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'providers',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',

                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type:'text'
                },
                {
                    name: 'website',
                    type:'text',
                    isNullable: true
                }, {
                    name: 'telefone',
                    type:'text'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('providers')
    }

}
