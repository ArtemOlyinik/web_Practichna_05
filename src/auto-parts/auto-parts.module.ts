import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module.js';
import { AutoPartsController } from './auto-parts.controller.js';
import { AutoPartsService } from './auto-parts.service.js';

@Module({
  imports: [SharedModule],
  controllers: [AutoPartsController],
  providers: [AutoPartsService],
  exports: [AutoPartsService],
})
export class AutoPartsModule {}
