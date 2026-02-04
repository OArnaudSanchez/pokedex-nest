import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePokemonDto, UpdatePokemonDto } from '../dtos';
import { PokemonResponse } from '../responses/pokemon.response';

export interface IPokemonService {
  getAllAsync(paginationDto: PaginationDto): Promise<PokemonResponse[]>;
  getByIdAsync(id: string): Promise<PokemonResponse>;
  createAsync(
    createPokemonDto: CreatePokemonDto,
  ): Promise<PokemonResponse | void>;
  createManyAsync(createPokemonDto: CreatePokemonDto[]): Promise<void>;
  updateAsync(id: string, updatePokemonDto: UpdatePokemonDto): Promise<void>;
  deleteAsync(id: string): Promise<void>;
  deleteAllAsync(): Promise<void>;
}
