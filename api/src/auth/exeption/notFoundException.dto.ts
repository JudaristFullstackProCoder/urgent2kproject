import { ApiProperty } from "@nestjs/swagger";

export default class NotFoundExceptionDto {
  @ApiProperty({
    example: "the server can't find the requested resource",
  })
  data: any;
  @ApiProperty({
    example: 404,
  })
  status: number;
}
