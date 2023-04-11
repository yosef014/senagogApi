import { MigrationInterface, QueryRunner } from 'typeorm';
const bcrypt = require('bcrypt');
import { User } from '../../src/resources/users/entities/user.entity';

export class createUserAdmin1681151831817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bcryptPassword = await bcrypt.hash('123456', 10);
    console.log('bcryptPassword', bcryptPassword);
    const savedUser = await User.create({
      fist_name: 'admin',
      last_name: 'admin',
      mobile: '0528302775',
      email: 'yosef014@gmail.com',
      senagog_id: 1,
      permission_type: 'ADMIN',
      password: bcryptPassword,
      created_at: new Date(),
      user_name: 'admin',
    }).save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
