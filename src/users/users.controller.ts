import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as events from '../events/app.events';
import { User } from './entities/user.entity';
import { MongooseObjectIdPipe } from '../utils/pipes/mongooseObjectId.pipe';
import { countries } from 'countries-list';
import BadRequestResponseDto from 'src/auth/exeption/badRequestResponse.dto';


@Controller('users')
@ApiTags('User')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: 'user data',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponseDto,
    status: 400,
    description: 'the server cannot or will not process the request due to something that is perceived to be a client error.',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Session() session,
  ) {
    // @ts-ignore
    if (!countries[updateUserDto.country]) {
      return {
        data: 'invalid country',
        status: 400,
      }
    }
    // @ts-ignore
    createUserDto.country = countries[createUserDto.country]
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create(createUserDto);
    if (user instanceof InternalServerErrorException) {
      return user;
    }
    this.eventEmitter.emit(events.USER_CREATED, session, 'user', user.data);
    return user.data;
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    isArray: true,
    status: 200,
    type: CreateUserDto,
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
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CreateUserDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  findOne(@Param('id', MongooseObjectIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: 'The record has been successfully updated.',
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  update(
    @Param('id', MongooseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Session() session: Record<string, unknown>,
  ) {
    // @ts-ignore
    if (!countries[updateUserDto.country]) {
      return {
        data: 'invalid country',
        status: 400,
      }
    }
    // @ts-ignore
    updateUserDto.country = countries[updateUserDto.country]
    return this.usersService.update(id, updateUserDto, session);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: 'The record has been successfully deleted.',
    status: 200,
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
  remove(
    @Param('userId', MongooseObjectIdPipe) userId: string,
    @Session() session: Record<string, unknown>,
  ) {
    const result = this.usersService.remove(userId, session);
    this.eventEmitter.emit(events.USER_DELETED, userId);
    this.eventEmitter.emit(events.USER_LOGOUT, session);
    return result;
  }
}
