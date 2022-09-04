import { ApiProperty } from "@nestjs/swagger";
import Country from "../../countries/country";

export class UpdateUserDto {
  @ApiProperty({
    example: "Toto",
  })
  name: string;
  @ApiProperty({
    example: "Junior",
  })
  @ApiProperty({
    example: null,
  })
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    example: 5000,
  })
  amount: number;
  @ApiProperty({
    example: "23-05-2001",
  })
  birthdate: string;
}
