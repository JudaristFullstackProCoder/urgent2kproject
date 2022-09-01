import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { countries, continents, languagesAll } from 'countries-list'
import countriesCities from './countries.js';
import Continent from './continent';
import Country from './country';
import CountryCities from './countryCities';
import Language from './language';


@Controller('')
@ApiTags('Countries')
export class CountriesController {
    @Get('countries')
    @ApiOkResponse({
      type: Country,
      description: 'return a list of all available countries',
      status: 200,
      isArray: false,
    })
    async getAllCountries(
    ) {
      return { ...countries}
    }

    @Get('cities')
    @ApiOkResponse({
      type: CountryCities,
      description: 'return a list of all available countries',
      status: 200,
      isArray: false,
    })
    async getCitiesOfCountry(
        @Query('c') countryName: string,
    ) {
      return {
          cities: countriesCities["countries"][countryName] ?? [],
      }
    }

    @Get('continents')
    @ApiOkResponse({
      type: Continent,
      description: 'return a list of all available countries',
      status: 200,
      isArray: false,
    })
    async getAllContinents(
    ) {
      return { ...continents}
    }

    @Get('languages')
    @ApiOkResponse({
      type: Language,
      description: 'return a list of all available countries',
      status: 200,
      isArray: false,
    })
    async getAllLanguages(
    ) {
      return { ...languagesAll}
    }
}
