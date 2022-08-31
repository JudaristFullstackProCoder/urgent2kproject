import { ApiProperty } from "@nestjs/swagger";

export default class BadRequestResponseDto {
    @ApiProperty({
        example: 'invalid country'
    })
    data: any;
    @ApiProperty({
        example: 400,
    })
    status: number;
}
