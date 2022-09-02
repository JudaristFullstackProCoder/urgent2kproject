import { ApiProperty } from "@nestjs/swagger";

export default class TransactionsNotFoundDto {
  @ApiProperty({
    example: [],
  })
  data: [];
  @ApiProperty({
    example: 404,
  })
  status: number;
}
