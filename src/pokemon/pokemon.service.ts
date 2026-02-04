import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto, UpdatePokemonDto } from './dtos';
import { PokemonResponse } from './responses/pokemon.response';
import { IPokemonService } from './interfaces/pokemon-service.interface';
import { PokemonMapper } from './mappers/pokemon.mapper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService implements IPokemonService {
  private readonly _defaultLimit: number;
  private readonly _defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly mapper: PokemonMapper,
    private readonly configService: ConfigService,
  ) {
    this._defaultLimit = configService.get<number>('defaultLimit')!;
    this._defaultOffset = configService.get<number>('defaultOffset')!;
  }

  async getAllAsync(paginationDto: PaginationDto): Promise<PokemonResponse[]> {
    const { limit = this._defaultLimit, offset = this._defaultOffset } = paginationDto;
    const pokemons = await this.pokemonModel.find().limit(limit).skip(offset);
    return this.mapper.mapPokemons(pokemons);
  }

  async getByIdAsync(id: string): Promise<PokemonResponse> {
    const pokemon = await this.pokemonModel.findById(id);

    if (!pokemon)
      throw new NotFoundException(`Pokemon with id ${id} was not found.`);

    return this.mapper.mapPokemon(pokemon);
  }

  async createAsync(
    createPokemonDto: CreatePokemonDto,
  ): Promise<PokemonResponse | void> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return this.mapper.mapPokemon(pokemon);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createManyAsync(createPokemonDto: CreatePokemonDto[]): Promise<void> {
    try {
      await this.pokemonModel.insertMany(createPokemonDto);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateAsync(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<void> {
    try {
      if (id !== updatePokemonDto.id)
        throw new BadRequestException('Pokemon Id is invalid.');

      const currentPokemon = await this.getByIdAsync(id);

      currentPokemon.pokemonNumber = updatePokemonDto.pokemonNumber!;

      await this.pokemonModel.updateOne(
        { name: updatePokemonDto.name },
        currentPokemon,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteAsync(id: string): Promise<void> {
    const currentPokemon = await this.getByIdAsync(id);
    await this.pokemonModel.deleteOne({ name: currentPokemon.name });
  }

  async deleteAllAsync(): Promise<void> {
    await this.pokemonModel.deleteMany({});
  }

  private handleError(error: any): void {
    const DUPLICATE_POKEMON_ERROR_CODE = 11000;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === DUPLICATE_POKEMON_ERROR_CODE) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `There is already a pokemon in the database ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException();
  }
}
