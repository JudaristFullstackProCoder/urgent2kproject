import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  city: string;
}
