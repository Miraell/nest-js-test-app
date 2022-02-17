import { Controller, Get, Render } from '@nestjs/common';
import { SourceService } from './source/source.service';

@Controller()
export class AppController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  @Render('index')
  async root() {
    return await this.sourceService.get(['news', 'phrases']);
  }
}
