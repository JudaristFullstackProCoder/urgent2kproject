import { ApiProperty } from "@nestjs/swagger";

export default class InternalServerErrorExceptionDto {
  @ApiProperty({
    example: "the server encountered an unexpected error",
  })
  data: any;
  @ApiProperty({
    example: 500,
  })
  status: number;
}
