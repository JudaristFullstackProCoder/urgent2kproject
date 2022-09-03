import { ApiProperty } from "@nestjs/swagger";

export default class TransactionNotFoundDto {
  @ApiProperty({
    examples: [null, {}],
  })
  data: null | {};
  @ApiProperty({
    example: 404,
  })
  status: number;
}
