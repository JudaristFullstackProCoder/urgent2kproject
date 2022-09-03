import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { EventEmitter2 } from "@nestjs/event-emitter";
import * as events from "../events/app.events";
import { MongooseObjectIdPipe } from "../utils/pipes/mongooseObjectId.pipe";
import { countries } from "countries-list";
import BadRequestResponseDto from "../auth/exeption/badRequestResponse.dto";
import InternalServerErrorExceptionDto from "../auth/exeption/internalServerErrorException.dto";
import NotFoundExceptionDto from "../auth/exeption/notFoundException.dto";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { UsersGetAllDto } from "./dto/get-all-users.dto";

@Controller("users")
@ApiTags("User")
export default class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService
  ) {}

  @Post()
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: "user data",
  })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: CreateUserDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponseDto,
    status: 400,
    description:
      "the server cannot or will not process the request due to something that is perceived to be a client error.",
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorExceptionDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Session() session,
    @Res() response: Response
  ) {
    // @ts-ignore
    if (!countries[createUserDto.country]) {
      return {
        data: "invalid country",
        status: 400,
      };
    }
    // @ts-ignore
    createUserDto.country = countries[createUserDto.country];
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      parseInt(this.configService.get<string>("PASSWORD_ROUNDS"))
    );
    const user = await this.usersService.create(createUserDto);
    if (user.status != 201) {
      return response.status(user.status).send(user);
    }
    this.eventEmitter.emit(events.USER_CREATED, session, "user", user.data);
    return response.status(user.status).send(user.data);
  }

  @Get()
  @ApiOkResponse({
    description: "The record has been successfully fetched.",
    isArray: true,
    status: 200,
    type: UsersGetAllDto,
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
  async findAll(@Res() response: Response): Promise<UsersGetAllDto[] | any> {
    const users = await this.usersService.findAllUsers();
    if (users.status !== 200) {
      return response.status(users.status).send(users.data);
    }
    return response.status(users.status).send(users.data);
  }

  @Get(":id")
  @ApiOkResponse({
    description: "The record has been successfully updated.",
    type: CreateUserDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundExceptionDto,
  })
  async findOne(
    @Param("id", MongooseObjectIdPipe) id: string,
    @Res() response: Response
  ) {
    const user = await this.usersService.findOne(id);
    if (user.status !== 200) {
      return response.status(user.status).send(user);
    }
    return response.status(user.status).send(user.data);
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "The record has been successfully updated.",
    type: "The record has been successfully updated.",
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorExceptionDto,
  })
  async update(
    @Param("id", MongooseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Session() session: Record<string, unknown>,
    @Res() response: Response
  ) {
    const t = await this.usersService.update(id, updateUserDto, session);
    if (t.status !== 200) {
      return response.status(t.status).send(t);
    }
    return response.status(t.status).send(t.data);
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "The record has been successfully deleted.",
    type: "The record has been successfully deleted.",
    status: 200,
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
  remove(
    @Param("userId", MongooseObjectIdPipe) userId: string,
    @Session() session: Record<string, unknown>
  ) {
    const result = this.usersService.remove(userId, session);
    this.eventEmitter.emit(events.USER_DELETED, userId);
    this.eventEmitter.emit(events.USER_LOGOUT, session);
    return result;
  }
}
