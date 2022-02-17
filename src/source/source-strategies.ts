import * as fetch from 'node-fetch';
import { NewsEntity } from './news-entity';
import { PhraseEntity } from './phrase-entity';
import { IRetrivable } from './source.interface';

export interface ISourceResponse {
  type: string;
  entities: Array<NewsEntity | PhraseEntity>;
}

export class NewsRetrieveStrategy implements IRetrivable {
  constructor(public timeoutMs: number) {}

  async retrieve(url: string): Promise<ISourceResponse> {
    let entities;

    try {
      let response = await fetch(url, { timeout: this.timeoutMs });
      let news = await response.json();
      entities = news.map(
        ({ title, url, description, ptime }) =>
          new NewsEntity(title, url, description, ptime),
      );
    } catch (error) {
      if (error.type == 'request-timeout') {
        entities = [];
      }
    }

    return {
      type: 'news',
      entities,
    };
  }
}

export class PhrasesRetrieveStrategy implements IRetrivable {
  async retrieve(url: string): Promise<ISourceResponse> {
    const response = await fetch(url);
    const phrases = await response.json();
    const entities = phrases.map((title) => new PhraseEntity(title));

    return {
      type: 'phrases',
      entities,
    };
  }
}

export const IMPORTANT_TIMEOUT_MS = 6000;
