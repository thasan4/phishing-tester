import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PhishingStatusEnum } from 'src/modules/phishing/enums/phishing-status.enum';

@Schema({ collection: 'PhishingAttempts', timestamps: true })
export class PhishingAttempt {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  public _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  public email: string;

  @Prop()
  public content: string;

  @Prop({
    type: String,
    default: PhishingStatusEnum.PENGING,
    enum: PhishingStatusEnum,
  })
  public status: PhishingStatusEnum;

  @Prop({ type: Date, default: null })
  public openedAt: Date | null;

  public createdAt: Date;

  public updatedAt: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
