import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export default class UpdatedUserDto {
  @ApiProperty({
    example: {
      _id: "6313d37e9304bc6bf8bd4d80",
      name: "Modrić",
      surname: "luka",
      country: {
        name: "Croatia",
        native: "Hrvatska",
        phone: "385",
        continent: "EU",
        capital: "Zagreb",
        currency: "HRK",
        languages: ["hr"],
        emoji: "🇭🇷",
        emojiU: "U+1F1ED U+1F1F7",
      },
      city: "Zadar",
      amount: 4990,
      email: "luka@gmail.com",
      password: "$2b$14$4CviVa03WKNVHIB8Uw6Ucez.ABDJpMh3gma1zwFO3EyrDZBZ6VMy.",
      birthday: "2004-06-18T23:00:00.000+00:00",
      received: 0,
      createdAt: "2022-09-03T22:21:50.315+00:00",
      updatedAt: "2022-09-04T01:01:11.779+00:00",
      sent: 10,
    },
  })
  user: User;
  @ApiProperty({
    example: "the user was updated successfully",
  })
  data: string;
  @ApiProperty({
    example: 200,
  })
  status: number;
}
