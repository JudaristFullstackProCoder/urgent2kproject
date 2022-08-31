import { ApiProperty } from "@nestjs/swagger"

export default class Country {
    /**
     * Capital in English.
     */
    @ApiProperty({
        example: 'Yaoundé',
    })
    capital: string
    /**
     * Continent alpha-2 code.
     */
    @ApiProperty({
        example: 'AF',
    })
    continent: string
    /**
     * Currency alpha-3 codes, comma-separated.
     */
     @ApiProperty({
        example: 'XAF',
    })
    currency: string
    /**
     * Country flag Emoji.
     */
     @ApiProperty({
        example: '',
    })
    emoji: string
    /**
     * Country flag Emoji string unicode characters space-separated, e.g. "U+1F1FA U+1F1E6".
     */
     @ApiProperty({
        example: 'U+1F1E8 U+1F1F2',
    })
    emojiU: string
    /**
     * List of Country's spoken Languages (alpha-2 codes).
     */
     @ApiProperty({
        example: ['fr', 'en'],
    })
    languages: string[]
    /**
     * Country name in English.
     */
     @ApiProperty({
        example: 'Cameroon',
    })
    name: string
    /**
     * Country name written natively.
     */
     @ApiProperty({
        example: 'Cameroon',
    })
    native: string
    /**
     * Calling phone codes, comma-separated.
     */
     @ApiProperty({
        example: 237,
    })
    phone: string
  }