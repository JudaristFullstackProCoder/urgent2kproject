import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Redirect,
  Res,
  Session,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../events/app.events';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private eventEmitter: EventEmitter2,
    private authService: AuthService,
  ) {}

  @ApiBody({
    type: LoginDto,
    description: 'credentials: email and password',
    required: true,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: CreateUserDto,
    description: '',
    status: 200,
  })
  @Post('/user/login/')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    const login = await this.authService.loginUser(email, password);
    if (
      !(login.status === 500) &&
      !(login.status === 404) &&
      !(login.status === 401)
    ) {
      this.eventEmitter.emit(USER_LOGIN, session, login);
    }
    return response.status(login.status).send(login);
  }

  @HttpCode(200)
  @Post('/user/logout/')
  @Redirect('/')
  logoutUser(@Session() session: Record<string, unknown>) {
    this.eventEmitter.emit(USER_LOGOUT, session);
  }
}
