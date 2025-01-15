import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('api/v1/tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}

  @Get()
  getTables() {
    return 'table';
  }
}
