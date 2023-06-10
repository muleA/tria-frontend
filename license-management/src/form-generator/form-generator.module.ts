import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ControllersController } from './controllers/controllers.controller';

@Module({
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class FormGeneratorModule {}
