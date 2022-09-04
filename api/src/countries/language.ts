import { ApiProperty } from "@nestjs/swagger";

export default class Language {
  /**
   * Language name in English.
   */
  @ApiProperty({
    example: "French",
  })
  name: string;
  /**
   * Language name written natively.
   */
  @ApiProperty({
    example: "Français",
  })
  native: string;
  /**
   * Specified if Language is RTL.
   */
  @ApiProperty({
    example: null,
  })
  rtl?: number;
}
