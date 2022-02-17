import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileLogger } from './filelogger';
import { SourceFactory } from './source/source-factory';
import { SourceService } from './source/source.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SourceService, SourceFactory, FileLogger],
})
export class AppModule {}
