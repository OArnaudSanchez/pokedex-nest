import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dtos';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonsAsync(@Query() paginationDto: PaginationDto) {
    return await this.pokemonService.getAllAsync(paginationDto);
  }

  @Get('/:id')
  async getPokemonByIdAsync(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.pokemonService.getByIdAsync(id);
  }

  @Post()
  async createPokemonAsync(@Body() createPokemonDto: CreatePokemonDto) {
    return await this.pokemonService.createAsync(createPokemonDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePokemonAsync(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    await this.pokemonService.updateAsync(id, updatePokemonDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePokemonAsync(@Param('id', ParseMongoIdPipe) id: string) {
    await this.pokemonService.deleteAsync(id);
  }
}
