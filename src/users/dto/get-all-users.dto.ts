import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class UsersGetAllDto {
  @ApiProperty({
    example: "6310f60bec7b241ff27b2680",
  })
  @Expose()
  _id: string;
  @ApiProperty({
    example: "Toto",
  })
  @Expose()
  name: string;
  @ApiProperty({
    example: "Junior",
  })
  @Expose()
  surname: string;
  @Exclude() city: string;

  @Exclude() password: string;

  @Exclude() email: string;

  @Exclude() amount: number;

  @Exclude() birthday: string;
}
