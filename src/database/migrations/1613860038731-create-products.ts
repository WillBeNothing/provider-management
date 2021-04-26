/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProducts1613860038731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
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
          name: 'price',
          type: 'decimal',
          precision: 12,
          scale: 2,
        },
        {
          name: 'productCode',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'isDollar',
          type: 'bool',
          default: false,
        },
        {
          name: 'providerID',
          type: 'integer',
        },
        {
          name: 'groupID',
          type: 'integer',
          isNullable: true,
        },
        {
          name: 'actived',
          type: 'bool',
          default: true,
        },
      ],
      foreignKeys: [
        {
          name: 'productProvider',
          columnNames: ['providerID'],
          referencedTableName: 'providers',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'productGroup',
          columnNames: ['groupID'],
          referencedTableName: 'groups',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('products');
  }
}
