import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonMapper } from './mappers/pokemon.mapper';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
    ConfigModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonMapper],
  exports: [PokemonService],
})
export class PokemonModule {}
