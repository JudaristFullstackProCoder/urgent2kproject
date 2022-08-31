import { ApiProperty } from "@nestjs/swagger"

export default class Continent {
    @ApiProperty({
        example: 'Africa'
    })
    AF: string
    @ApiProperty({
        example: 'Antarctica'
    })
    AN: string
    @ApiProperty({
        example: 'Asia'
    })
    AS: string
    @ApiProperty({
        example: 'Europe'
    })
    EU: string
    @ApiProperty({
        example: 'North America'
    })
    NA: string
    @ApiProperty({
        example: 'Oceania'
    })
    OC: string
    @ApiProperty({
        example: 'South America'
    })
    SA: string
  }