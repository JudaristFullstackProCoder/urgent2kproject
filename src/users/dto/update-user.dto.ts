import { ApiProperty } from "@nestjs/swagger";
import Country from "../../countries/country";

export class UpdateUserDto {
  @ApiProperty({
    example: "Toto",
  })
  name: string;
  @ApiProperty({
    example: "Junior",
  })
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
  @ApiProperty({
    example: null,
  })
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    example: 5000,
  })
  amount: number;
  @ApiProperty({
    example: "23-05-2001",
  })
  birthdate: string;
}
