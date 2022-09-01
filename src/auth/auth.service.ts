import {
  Inject,
  Injectable,
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
        return {
          data: 'this email is not linked to any account',
          status: 404,
        }
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return {
          data: 'Invalid Credentials',
          status: 401,
        };
      }
      return {
        data: user,
        status: 200,
      };
    } catch (e) {
      return {
        data: e.data ?? '',
        status: 500,
      };
    }
  }
}
