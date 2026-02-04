import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dtos';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  private readonly _defaultLimit: number;
  private readonly _baseUrl: string;

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly axiosAdapter: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {
    this._defaultLimit = this.configService.get<number>('defaultSeedLimit')!;
    this._baseUrl = this.configService.get<string>('apiBaseUrl')!;
  }

  async loadData() {
    await this.pokemonService.deleteAllAsync();

    const data = await this.axiosAdapter.get<PokeResponse>(
      `${this._baseUrl}/pokemon?limit=${this._defaultLimit}`,
    );

    const pokemonsToInsert: CreatePokemonDto[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const pokemonNumber: number = Number.parseInt(
        segments[segments.length - 2],
      );

      pokemonsToInsert.push({ name, pokemonNumber });
    });

    await this.pokemonService.createManyAsync(pokemonsToInsert);

    return `Seed excecuted.`;
  }
}
