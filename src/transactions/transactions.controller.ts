import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiBody({
    required: true,
    type: CreateTransactionDto,
    description: "user data",
  })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: CreateTransactionDto,
    status: 201,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorException,
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.transactionsService.findOne(id);
  }
}
