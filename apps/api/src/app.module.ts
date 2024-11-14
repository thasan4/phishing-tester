import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from '@shared/config/config.service';
import { MONGO_SCHEMAS } from '@shared/database/schemas';

import { AdminModule } from './modules/admin/admin.module';
import { PhishingModule } from './modules/phishing/phishing.module';

@Module({
  imports: [
    MongooseModule.forRoot(configService.getMongoString()),
    MongooseModule.forFeature(MONGO_SCHEMAS),
    AdminModule,
    PhishingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
