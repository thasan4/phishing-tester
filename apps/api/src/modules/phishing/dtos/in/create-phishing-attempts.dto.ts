import { IsEmail } from 'class-validator';

export class CreatePhishingAttemptDto {
  @IsEmail()
  public email: string;
}
