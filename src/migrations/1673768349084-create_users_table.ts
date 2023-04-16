import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createUsersTable1673768349084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        if(!await queryRunner.hasTable('senagogs')){
            await queryRunner.createTable(
              new Table({
                  name: 'senagogs',
                  columns: [
                      {
                          name: 'id',
                          type: 'bigint',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                      },
                      {
                          name: 'name',
                          type: 'varchar',
                          isNullable:true
                      },
                      {
                          name: 'description',
                          type: 'text',
                          isNullable: true
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
                          isNullable: true
                      }
                  ]
              }));
        }

        if(!await queryRunner.hasTable('users')){
            await queryRunner.createTable(
              new Table({
                  name: 'users',
                  columns: [
                      {
                          name: 'id',
                          type: 'bigint',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                      },
                      {
                          name: 'uuid',
                          type: 'varchar',
                          generationStrategy: 'uuid'
                      },
                      {
                          name: 'fist_name',
                          type: 'varchar',
                          isNullable: true
                      },
                      {
                        name: 'senagog_id',
                        type: 'bigint',
                        isNullable: true
                    },
                      {
                          name: 'user_name',
                          type: 'varchar',
                          isNullable: false,
                          isUnique: true
                      },
                      {
                          name: 'last_name',
                          type: 'varchar',
                          isNullable: true
                      },
                      {
                          name: 'is_active',
                          type: 'tinyint',
                          default: true
                      },
                      {
                          name: 'mobile',
                          type: 'varchar',
                          isNullable:true
                      },
                      {
                          name: 'email',
                          type: 'varchar',
                          isNullable:true
                      },
                      {
                          name: 'permission_type',
                          type: 'varchar',
                          isNullable: true
                      },
                      {
                          name: 'password',
                          type: 'varchar',
                          isNullable:true
                      },
                      {
                          name: 'created_at',
                          type: 'timestamp',
                          default: "CURRENT_TIMESTAMP"
                      },
                      {
                          name: 'last_logged',
                          type: 'timestamp',
                          isNullable:true
                      },
                      {
                          name: 'updated_at',
                          type: 'timestamp',
                          default: "CURRENT_TIMESTAMP"
                      },
                      {
                          name: 'deleted_at',
                          type: 'timestamp',
                          isNullable: true
                      }
                  ]
              }));
        }

        let table: any = await queryRunner.getTable('users')
        if (table) {
            const foreignKey1 = table.foreignKeys.find((fk: any) => fk.columnNames.indexOf('senagog_id') !== -1);
            if (!foreignKey1) {
                await queryRunner.createForeignKey('users', new TableForeignKey({
                    columnNames: ['senagog_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'senagogs',
                }))
            }
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
