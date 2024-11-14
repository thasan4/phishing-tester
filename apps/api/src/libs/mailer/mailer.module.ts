import { Module } from '@nestjs/common';
import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';
import { configService } from '@shared/config/config.service';

import { MailerService } from './mailer.service';

@Module({
  imports: [
    NodeMailerModule.forRoot({
      transport: configService.getSMTPString(),
      defaults: {
        from: `"No Reply" <${configService.getCustomKey('FROM_EMAIL')}>`,
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
