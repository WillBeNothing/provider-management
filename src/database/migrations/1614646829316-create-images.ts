/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImages1614646829316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'productID',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: 'productsImages',
          columnNames: ['productID'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',

        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
