import { ApiProperty } from "@nestjs/swagger";

export default class ObjectIdDto {
    @ApiProperty({
        example: '630fd82cd7fae7107a9a3efc',
        required: false,
    })
    _id: string;
}