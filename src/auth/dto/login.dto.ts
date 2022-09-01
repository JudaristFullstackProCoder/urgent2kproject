import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "judearist@gmail.com",
  })
  email: string;
  @ApiProperty({
    example: "secretpassword",
  })
  password: string;
}
