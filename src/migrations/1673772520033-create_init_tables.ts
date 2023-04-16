import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createInitTables1673772520033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('customers'))) {
      await queryRunner.createTable(
        new Table({
          name: 'customers',
          columns: [
            {
              name: 'id',
              type: 'bigint',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'first_name',
              type: 'bigint',
              isNullable: true,
            },
            {
              name: 'last_name',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'mobile',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      );
    }


    // ---------------------------------------------------------------------------

    if (!(await queryRunner.hasTable('customer_senagog_pivot'))) {
      await queryRunner.createTable(
        new Table({
          name: 'customer_senagog_pivot',
          columns: [
            {
              name: 'id',
              type: 'bigint',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'customer_id',
              type: 'bigint',
              isNullable: false,
            },
            {
              name: 'senagog_id',
              type: 'bigint',
              isNullable: false,
            },

            {
              name: 'created_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      );
    }

    let table = await queryRunner.getTable('customer_senagog_pivot');
    if (table) {
      const foreignKey1 = table.foreignKeys.find(
        (fk: any) => fk.columnNames.indexOf('customer_id') !== -1,
      );
      if (!foreignKey1) {
        await queryRunner.createForeignKey(
          'customer_senagog_pivot',
          new TableForeignKey({
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
          }),
        );
      }
    }

    table = await queryRunner.getTable('customer_senagog_pivot');
    if (table) {
      const foreignKey1 = table.foreignKeys.find(
        (fk: any) => fk.columnNames.indexOf('senagog_id') !== -1,
      );
      if (!foreignKey1) {
        await queryRunner.createForeignKey(
          'customer_senagog_pivot',
          new TableForeignKey({
            columnNames: ['senagog_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'senagogs',
          }),
        );
      }
    }

    // r
    if (!(await queryRunner.hasTable('vows'))) {
      await queryRunner.createTable(
        new Table({
          name: 'vows',
          columns: [
            {
              name: 'id',
              type: 'bigint',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'customer_id',
              type: 'bigint',
              isNullable: true,
            },
            {
              name: 'senagog_id',
              type: 'bigint',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'bigint',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      );
    }

    table = await queryRunner.getTable('vows');
    if (table) {
      const foreignKey1 = table.foreignKeys.find(
        (fk: any) => fk.columnNames.indexOf('customer_id') !== -1,
      );
      if (!foreignKey1) {
        await queryRunner.createForeignKey(
          'vows',
          new TableForeignKey({
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
          }),
        );
      }
      const foreignKey2 = table.foreignKeys.find(
          (fk: any) => fk.columnNames.indexOf('senagog_id') !== -1,
      );
      if (!foreignKey2) {
        await queryRunner.createForeignKey(
            'vows',
            new TableForeignKey({
              columnNames: ['senagog_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'senagogs',
            }),
        );
      }
    }

    // ---------------------------------------------------------------------------
    if (!(await queryRunner.hasTable('receipts'))) {
      await queryRunner.createTable(
        new Table({
          name: 'receipts',
          columns: [
            {
              name: 'id',
              type: 'bigint',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'customer_id',
              type: 'bigint',
              isNullable: false,
            },
            {
              name: 'senagog_id',
              type: 'bigint',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'bigint',
              isNullable: false,
            },
            {
                name: 'description',
                type: 'text',
                isNullable: true,
              },
              {
                name: 'name',
                type: 'varchar',
                isNullable: true,
              },
            {
              name: 'created_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: "CURRENT_TIMESTAMP"
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      );
    }

    table = await queryRunner.getTable('receipts');
    if (table) {
      const foreignKey1 = table.foreignKeys.find(
        (fk: any) => fk.columnNames.indexOf('customer_id') !== -1,
      );
      if (!foreignKey1) {
        await queryRunner.createForeignKey(
          'receipts',
          new TableForeignKey({
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
          }),
        );
      }
      const foreignKey2 = table.foreignKeys.find(
          (fk: any) => fk.columnNames.indexOf('senagog_id') !== -1,
      );
      if (!foreignKey2) {
        await queryRunner.createForeignKey(
            'receipts',
            new TableForeignKey({
              columnNames: ['senagog_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'senagogs',
            }),
        );
      }
    }



    // ---------------------------------------------------------------------------
    if (!(await queryRunner.hasTable('expenses'))) {
        await queryRunner.createTable(
          new Table({
            name: 'expenses',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'customer_id',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'senagog_id',
                type: 'bigint',
                isNullable: true,
              },
              {
                name: 'price',
                type: 'bigint',
                isNullable: false,
              },
              {
                  name: 'description',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: true,
                },
              {
                name: 'created_at',
                type: 'timestamp',
                default: "CURRENT_TIMESTAMP"
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: "CURRENT_TIMESTAMP"
              },
              {
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true,
              },
            ],
          }),
        );
      }

      table = await queryRunner.getTable('expenses');
      if (table) {
        const foreignKey1 = table.foreignKeys.find(
          (fk: any) => fk.columnNames.indexOf('customer_id') !== -1,
        );
        if (!foreignKey1) {
          await queryRunner.createForeignKey(
            'expenses',
            new TableForeignKey({
              columnNames: ['customer_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'customers',
            }),
          );
        }

        const foreignKey2 = table.foreignKeys.find(
            (fk: any) => fk.columnNames.indexOf('senagog_id') !== -1,
        );
        if (!foreignKey2) {
          await queryRunner.createForeignKey(
              'expenses',
              new TableForeignKey({
                columnNames: ['senagog_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'senagogs',
              }),
          );
        }
      }

    // ---------------------------------------------------------------------------
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
