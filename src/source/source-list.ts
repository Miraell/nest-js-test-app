import { ISource } from './source.interface';

const sourceList: Array<ISource> = [
  {
    type: 'news',
    url: 'http://slowpoke.desigens.com/json/1/7000',
    isImportant: true,
  },
  {
    type: 'phrases',
    url: 'http://slowpoke.desigens.com/json/2/3000',
    isImportant: false,
  },
];

export { sourceList };
