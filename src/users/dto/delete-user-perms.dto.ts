import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserPermsDto {
  @ApiProperty()
  perms: string;
}
