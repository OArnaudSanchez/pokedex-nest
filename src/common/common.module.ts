import { Module } from '@nestjs/common';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  imports: [],
  providers: [ParseMongoIdPipe, AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
