import { Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly nodeMailerService: NodeMailerService) {}

  public sendMail(data: {
    subject: string;
    text: string;
    html: string;
    to: string;
    from?: string;
  }) {
    return this.nodeMailerService.sendMail(data);
  }
}
