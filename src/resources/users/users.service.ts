import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import ErrorHandler from "../../helpers/error-handling/error-handler";
import { JwtService } from "@nestjs/jwt";
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
  ) {}
  async create(body) {
    try {
      const { fist_name, last_name, mobile, email, senagog_id, permission_type, image_url, password, user_name } = body

      const existUser = await User.findOne({ where: { user_name, senagog_id } })
      if (existUser) {
        throw new HttpException('user-already-exist', HttpStatus.NOT_FOUND)
      }
      if (!password || !user_name) {
        throw new HttpException('not-valid', HttpStatus.METHOD_NOT_ALLOWED)
      }
      const bcryptPassword = await bcrypt.hash(password, 10);
      const savedUser = await User.create({
        fist_name,
        last_name,
        mobile,
        email,
        senagog_id,
        permission_type: 'GABAY',
        password: bcryptPassword,
        user_name
      }).save()

      delete savedUser.password

      return  savedUser
    } catch (e) {
      new ErrorHandler(e, 'create-user-error')
    }
  }

  async login(body) {
    try {
      const {  password, user_name } = body

      const existUser = await User.findOne({ where: { user_name } })
      const isPasswordMatching = await bcrypt.compare(password, existUser.password)
      if (!existUser || !isPasswordMatching) {
        throw new HttpException('password-or-username-wrong', HttpStatus.NOT_FOUND)
      }
      await User.update(existUser.id, { last_logged: new Date() })
     const token = this.generateToken(existUser)

      return token

    } catch (e) {
      new ErrorHandler(e, 'create-user-error')
    }
  }

  generateToken (user) {
    return {
      token: this.jwtService.sign({
        jti: user.id,
      })
    }
  }
  decodeToken (bearerToken) {
    try {
      const [bearer, token] = bearerToken.includes('%20')? bearerToken.split('%20') : bearerToken.split(' ')
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User-is-not-authorized' })
      }
      return this.jwtService.verify(token);
    } catch (e) {
      // new ErrorHandler(e, 'decodeToken')
      throw new UnauthorizedException({ message: 'User-is-not-authorized' , invalidToken: true })
    }
  }
  async findAll() {
    const users = await User.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
