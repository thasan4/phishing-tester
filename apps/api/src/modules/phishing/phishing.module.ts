import { MailerModule } from '@libs/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_SCHEMAS } from '@shared/database/schemas';

import { JwtStrategy } from '../admin/strategies/local.admin-jwt.strategy';
import { PhishingController } from './controllers/phishing.controller';
import { PhishingRepository } from './repositories/phishing.repository';
import { PhishingService } from './services/phishing.service';

@Module({
  imports: [MongooseModule.forFeature(MONGO_SCHEMAS), MailerModule],
  controllers: [PhishingController],
  providers: [PhishingRepository, PhishingService, JwtStrategy],
})
export class PhishingModule {}
