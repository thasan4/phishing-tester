import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt } from '@shared/database/schemas/phishing-attempts.schema';
import { Model, Schema } from 'mongoose';

import { PhishingStatusEnum } from '../enums/phishing-status.enum';

@Injectable()
export class PhishingRepository {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private readonly phishingAttemptModel: Model<PhishingAttempt>,
  ) {}

  public async createPhishingAttempt(email: string): Promise<PhishingAttempt> {
    return this.phishingAttemptModel.create({ email });
  }

  public async listPhishingAttempts(
    page: number,
    perPage: number,
  ): Promise<PhishingAttempt[]> {
    return this.phishingAttemptModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
  }

  public async countPhishingAttempts(): Promise<number> {
    return this.phishingAttemptModel.countDocuments();
  }

  public async setPhishingAttemptAsRead(id: string) {
    return this.phishingAttemptModel.updateOne(
      { _id: id },
      { status: PhishingStatusEnum.RESOLVED, openedAt: new Date() },
    );
  }

  public async setPhishingAttemptContent(
    id: Schema.Types.ObjectId,
    content: string,
  ) {
    return this.phishingAttemptModel.updateOne({ _id: id }, { content });
  }
}
