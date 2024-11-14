import { Schema } from 'mongoose';

import { PhishingStatusEnum } from '../../enums/phishing-status.enum';

export class ListPhishingAttemptsOutDto {
  public _id: Schema.Types.ObjectId;

  public email: string;

  public status: PhishingStatusEnum;

  public content: string;

  public openedAt: Date | null;

  public createdAt: Date;

  public updatedAt: Date;
}
