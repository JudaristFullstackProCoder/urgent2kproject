import {
  Body,
  Controller,
  HttpCode,
  Post,
  Redirect,
  Res,
  Session,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { USER_LOGIN, USER_LOGOUT } from "../events/app.events";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import InternalServerErrorExceptionDto from "./exeption/internalServerErrorException.dto";
import NotFoundExceptionDto from "./exeption/notFoundException.dto";
import LogoutDto from "./dto/logout.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private eventEmitter: EventEmitter2,
    private authService: AuthService
  ) {}

  @ApiBody({
    type: LoginDto,
    description: "credentials: email and password",
    required: true,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorExceptionDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundExceptionDto,
  })
  @ApiOkResponse({
    type: CreateUserDto,
    description: "",
    status: 200,
  })
  @Post("/user/login/")
  async loginUser(
    @Body("email") email: string,
    @Body("password") password: string,
    @Session() session: Record<string, any>,
    @Res() response: Response
  ) {
    const login = await this.authService.loginUser(email, password);
    if (
      !(login.status === 500) &&
      !(login.status === 404) &&
      !(login.status === 401)
    ) {
      this.eventEmitter.emit(USER_LOGIN, session, login);
    }
    return response.status(login.status).send(login.data);
  }

  @HttpCode(200)
  @ApiOkResponse({
    type: LogoutDto,
    description: "",
    status: 200,
  })
  @Post("/user/logout/")
  @Redirect("/")
  logoutUser(
    @Session() session: Record<string, unknown>,
    @Res() response: Response
  ) {
    this.eventEmitter.emit(USER_LOGOUT, session);
    return response.status(200).send({
      data: "user logged out successfully",
      status: 200,
    });
  }
}
