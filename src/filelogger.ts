import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class FileLogger extends Logger {
  warn(message: string, type: string) {
    super.warn(message);
    fs.writeFile(
      `logs/${type}.log`,
      `${message}\r\n`,
      { flag: 'a+' },
      (error) => {
        if (error) throw error;
      },
    );
  }
}
