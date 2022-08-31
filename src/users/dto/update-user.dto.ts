import { ApiProperty } from '@nestjs/swagger';
import Country from 'src/countries/country';

export class UpdateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  country: string | Country;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  birthday: string;
}
