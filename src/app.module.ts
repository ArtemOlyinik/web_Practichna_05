import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AutoPartsModule } from './auto-parts/auto-parts.module.js';
import { SharedModule } from './shared/shared.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
  imports: [AutoPartsModule, SharedModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
