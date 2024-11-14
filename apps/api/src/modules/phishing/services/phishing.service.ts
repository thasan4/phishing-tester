import { MailerService } from '@libs/mailer/mailer.service';
import { Injectable } from '@nestjs/common';
import { configService } from '@shared/config/config.service';

import { CreatePhishingAttemptDto } from '../dtos/in/create-phishing-attempts.dto';
import { ListPhishingAttemptsDto } from '../dtos/in/list-phishing-attempts.dto';
import { PhishingRepository } from '../repositories/phishing.repository';

@Injectable()
export class PhishingService {
  constructor(
    private readonly phishingRepository: PhishingRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async createPhishingAttempt(data: CreatePhishingAttemptDto) {
    const phishingAttempt = await this.phishingRepository.createPhishingAttempt(
      data.email,
    );

    const content = `Please proceed to this <a href="${configService.getCustomKey(
      'BACKEND_URL',
    )}/api/pretty-link/${phishingAttempt._id}">link</a>`;

    phishingAttempt.content = content;

    await this.phishingRepository.setPhishingAttemptContent(
      phishingAttempt._id,
      content,
    );

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Phishing Attempt',
      text: content,
      html: content,
    });

    return phishingAttempt;
  }

  public async listPhishingAttempts(data: ListPhishingAttemptsDto) {
    return this.phishingRepository.listPhishingAttempts(
      data.page,
      data.perPage,
    );
  }

  public async countPhishingAttempts() {
    return this.phishingRepository.countPhishingAttempts();
  }

  public async getPhishingAttemptById(id: string) {
    await this.phishingRepository.setPhishingAttemptAsRead(id);

    return 'Hello, World!';
  }
}
