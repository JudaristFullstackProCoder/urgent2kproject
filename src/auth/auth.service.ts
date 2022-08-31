import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import UsersRepository from '../users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async loginUser(email: string, password: string) {
    try {
      const user = await this.usersRepository
        .getModel()
        .findOne({
          email: email,
        })
        .exec();
      if (!user) {
        return new NotFoundException('This email is not liked to any account');
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return new UnauthorizedException('Invalid Credentials');
      }
      return user;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
