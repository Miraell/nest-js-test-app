import { Injectable } from '@nestjs/common';
import { RetrivableSource, IMPORTANT_TIMEOUT_MS } from './source.interface';
import {
  NewsRetrieveStrategy,
  PhrasesRetrieveStrategy,
} from './source-strategies';
import { sourceList } from './source-list';

@Injectable()
export class SourceFactory {
  create(sourceType: string): RetrivableSource {
    const { type, url, isImportant } = sourceList.find(
      (source) => source.type === sourceType,
    );
    const source = new RetrivableSource(type, url, isImportant);

    if (!source) {
      throw new Error('Not existing source type');
    }

    switch (type) {
      case 'news':
        source.setRetrieveStrategy(
          new NewsRetrieveStrategy(IMPORTANT_TIMEOUT_MS),
        );
        break;
      case 'phrases':
        source.setRetrieveStrategy(new PhrasesRetrieveStrategy());
        break;
      default:
        throw new Error(`No strategy is set for type ${type}`);
    }

    return source;
  }
}
