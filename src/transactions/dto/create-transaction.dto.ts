import { ApiProperty, PartialType } from "@nestjs/swagger";
import ObjectIdDto from "./objectId.dto";

export class CreateTransactionDto extends PartialType(ObjectIdDto) {
    /**
     * User sender id
     */
    @ApiProperty({
        example: '630fd7caa1b6f3326906ad23',
    })
    sender: string;

    /**
     * User receiver id
     */
    @ApiProperty({
        example: '630fd7bc8653385e69e91554',
    })
    receiver: string;

    /**
     * amount of the transaction , max amount = 5000
     */
    @ApiProperty({
        example: 3120,
    })
    amount: number;

    /**
     * The currency of the sender
     */
    @ApiProperty({
        example: 'XAF',
    })
    from: string;

    /**
     * the currency of the receiver
     */
    @ApiProperty({
        example: 'EUR',
    })
    to: string;
}
