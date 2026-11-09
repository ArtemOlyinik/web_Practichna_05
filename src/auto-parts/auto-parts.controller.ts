import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RequestIdService } from '../shared/request-id.service.js';
import { AutoPartsService } from './auto-parts.service.js';
import { CreateAutoPartDto } from './dto/create-auto-part.dto.js';
import { UpdateAutoPartDto } from './dto/update-auto-part.dto.js';

@Controller('auto-parts')
export class AutoPartsController {
  private readonly logger = new Logger(AutoPartsController.name);

  constructor(
    private readonly autoPartsService: AutoPartsService,
    private readonly requestIdService: RequestIdService,
  ) {}

  private logRequest(method: string): void {
    this.logger.log(`${method} requestId=${this.requestIdService.getId()}`);
  }

  @Get()
  @Header('X-API-Version', '1.0')
  @Header('X-Service-Status', 'operational')
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ) {
    this.logRequest('GET /auto-parts');
    const parsedLimit =
      limit === undefined ? undefined : Number.parseInt(limit, 10);

    if (
      parsedLimit !== undefined &&
      (Number.isNaN(parsedLimit) || parsedLimit < 0)
    ) {
      throw new BadRequestException(
        'Параметр limit має бути невід’ємним числом',
      );
    }

    return this.autoPartsService.findAll(search, parsedLimit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autoPartsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAutoPartDto: CreateAutoPartDto) {
    this.logRequest('POST /auto-parts');
    return this.autoPartsService.create(createAutoPartDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutoPartDto: UpdateAutoPartDto,
  ) {
    return this.autoPartsService.update(id, updateAutoPartDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.autoPartsService.remove(id);
  }
}
