import { ApiProperty } from "@nestjs/swagger";

export default class CountryCities {
  @ApiProperty({
    example: [
      "Douala",
      "Yaoundé",
      "Bamenda",
      "Buéa",
      "Abong Mbang",
      "Kribi",
      "Tiko",
      "Kumba",
      "Bafoussam",
      "Kumbo",
      "Garoua",
      "Edéa",
      "Muyuka",
      "Bana",
      "Mbalmayo",
      "Mamfé",
      "Ngaoundéré",
      "Nkongsamba",
      "Kaélé",
      "Bafang",
      "Lomié",
      "Wum",
      "Idenao",
      "Obala",
      "Djoum",
      "Monatélé",
      "Lolodorf",
      "Mbengwi",
      "Limbe",
      "Kousséri",
      "Maroua",
      "Mokolo",
      "Bertoua",
      "Loum",
      "Foumban",
      "Garoafa",
      "Ebolowa",
      "Djang",
      "Bafia",
      "Yokadouma",
      "Guider",
      "Mbouda",
      "Sangmélima",
      "Yagoua",
      "Mbanga",
      "Moloundou",
      "Yabassi",
      "Bangangte",
      "Akonolinga",
      "Foumbot",
      "Banyo",
      "Dibombari",
      "Eséka",
      "Bogo",
      "Nanga Eboko",
      "Manjo",
      "Batouri",
      "Meiganga",
      "Njinikom",
      "Nkambe",
      "Mindif",
      "Bafut",
      "Colón",
      "Bali",
      "Bonabéri",
      "Mvangué",
      "Lagdo",
      "Bétaré Oya",
      "Figuif",
      "Tcholliré",
      "Akom",
      "Mfou",
      "Tibati",
      "Mme",
      "Fontem",
      "Saa",
      "Ombésa",
      "Doumé",
      "Istanbul",
      "Rey Bouba",
      "Ambam",
      "Méri",
      "Tignère",
    ],
  })
  cities: string[];
}
