import { ApiProperty } from "@nestjs/swagger";

export default class LogoutDto {
    @ApiProperty({
        example: 'user logged out successfully',
    })
    data: string;
    @ApiProperty({
        example: 200,
    })
    status: number;
}