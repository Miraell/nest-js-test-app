import { Injectable } from '@nestjs/common';
import { FileLogger } from 'src/filelogger';
import { SourceFactory } from './source-factory';
import { RetrivableSource } from './source.interface';

@Injectable()
export class SourceService {
  constructor(
    private readonly sourceFactory: SourceFactory,
    private readonly logger: FileLogger,
  ) {}

  async get(sourceTypes: Array<string>) {
    let secondary = [];
    const instanciatedSources: Array<RetrivableSource> = sourceTypes.map(
      (sourceType) => this.sourceFactory.create(sourceType),
    );

    Promise.all(
      instanciatedSources
        .filter((source) => !source.isImportant)
        .map((source) => source.retrieve()),
    ).then((data) => (secondary = data));
    let primary = await Promise.all(
      instanciatedSources
        .filter((source) => source.isImportant)
        .map((source) => source.retrieve()),
    );

    const data = [...primary, ...secondary].reduce((acc, value) => {
      if (value.entities.length) {
        acc[value.type] = value.entities;
      }
      return acc;
    }, {});

    sourceTypes.forEach((type) => {
      if (data[type] === undefined || !data[type].length) {
        const now = new Date().toString();
        this.logger.warn(
          `${now} | No entities were retrieved from ${type}`,
          'warn-no-entities',
        );
      }
    });

    return { data };
  }
}
