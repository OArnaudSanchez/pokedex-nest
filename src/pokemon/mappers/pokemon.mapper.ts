import { Injectable } from '@nestjs/common';
import { Pokemon } from '../entities/pokemon.entity';
import { PokemonResponse } from '../responses/pokemon.response';

@Injectable()
export class PokemonMapper {
  mapPokemon(pokemon: Pokemon): PokemonResponse {
    const { _id, name, pokemonNumber } = pokemon;

    const response: PokemonResponse = {
      id: _id.toString(),
      name: name,
      pokemonNumber: pokemonNumber,
    };

    return response;
  }

  mapPokemons(pokemons: Pokemon[]): PokemonResponse[] {
    return pokemons.map((pokemon) => this.mapPokemon(pokemon));
  }
}
