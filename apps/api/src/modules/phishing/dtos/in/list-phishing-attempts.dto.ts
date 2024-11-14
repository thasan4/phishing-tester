import { IsInt } from 'class-validator';

export class ListPhishingAttemptsDto {
  @IsInt()
  public page: number = 1;

  @IsInt()
  public perPage: number = 20;
}
