import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  city: string;
}
