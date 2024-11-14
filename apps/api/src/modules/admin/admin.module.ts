import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_SCHEMAS } from '@shared/database/schemas';

import { AdminController } from './controllers/admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './services/admin.service';

@Module({
  imports: [JwtModule, MongooseModule.forFeature(MONGO_SCHEMAS)],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [],
})
export class AdminModule {}
