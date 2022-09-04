import { ApiProperty, PartialType } from "@nestjs/swagger";
import Country from "src/countries/country";
import { UpdateUserDto } from "./update-user.dto";

export class CreateUserDto extends PartialType(UpdateUserDto) {
  surname: string;
  @ApiProperty({
    example: {
      CM: {
        name: "Cameroon",
        native: "Cameroon",
        phone: "237",
        continent: "AF",
        capital: "Yaoundé",
        currency: "XAF",
        languages: ["en", "fr"],
        emoji: "🇨🇲",
        emojiU: "U+1F1E8 U+1F1F2",
      },
    },
  })
  country: string | Country;
  @ApiProperty({
    example: "Douala",
  })
  city: string;
}
