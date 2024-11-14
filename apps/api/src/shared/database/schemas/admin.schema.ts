import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'Admins', timestamps: true })
export class Admin {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  public _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  public email: string;

  @Prop()
  public passwordHash: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
