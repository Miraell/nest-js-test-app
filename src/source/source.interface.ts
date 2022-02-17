import { ISourceResponse } from './source-strategies';

export interface ISource {
  type: string;
  url: string;
  isImportant: boolean;
}

export interface IRetrivable {
  retrieve(url: string): Promise<ISourceResponse>;
}

export class RetrivableSource implements ISource, IRetrivable {
  constructor(
    public type: string,
    public url: string,
    public isImportant: boolean,
    private retrieveStrategy?: IRetrivable,
  ) {}

  setRetrieveStrategy(retrieveStrategy: IRetrivable) {
    this.retrieveStrategy = retrieveStrategy;
  }

  retrieve(): Promise<ISourceResponse> {
    return this.retrieveStrategy.retrieve(this.url);
  }
}

export const IMPORTANT_TIMEOUT_MS = 6000;
