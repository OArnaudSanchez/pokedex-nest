import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //Module for use environment variables, it is important to define at the top of the imports.
      load: [EnvConfiguration],
    }),
    // Module for serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CommonModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING!, {
      dbName: process.env.MONGODB_DATABASE_NAME,
    }), //load connection string from environment variables.
    PokemonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
