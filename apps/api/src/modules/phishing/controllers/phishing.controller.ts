import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/modules/admin/guards/jwtAuthentication.guard';

import { CreatePhishingAttemptDto } from '../dtos/in/create-phishing-attempts.dto';
import { ListPhishingAttemptsDto } from '../dtos/in/list-phishing-attempts.dto';
import { ListPhishingAttemptsOutDto } from '../dtos/out/list-phishing-attempts-out.dto';
import { PhishingService } from '../services/phishing.service';

@Controller('')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('phishing/send')
  @UseGuards(AdminAuthGuard)
  public async createPhishingAttempt(@Body() body: CreatePhishingAttemptDto) {
    return this.phishingService.createPhishingAttempt(body);
  }

  @Get('phishing/list')
  @UseGuards(AdminAuthGuard)
  public async listPhishingAttempts(
    @Query() query: ListPhishingAttemptsDto,
  ): Promise<ListPhishingAttemptsOutDto[]> {
    return this.phishingService.listPhishingAttempts(query);
  }

  @Get('phishing/count')
  @UseGuards(AdminAuthGuard)
  public async countPhishingAttempts() {
    return this.phishingService.countPhishingAttempts();
  }

  @Get('pretty-link/:id')
  public async prettyLink(@Param('id') id: string) {
    return this.phishingService.getPhishingAttemptById(id);
  }
}
