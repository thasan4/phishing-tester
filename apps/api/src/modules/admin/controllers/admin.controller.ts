import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AdminLoginDto } from '../dtos/in/admin-login.dto';
import { AdminLoginOutDto } from '../dtos/out/admin-login-out.dto';
import { AdminService } from '../services/admin.service';
import { AdminAuthGuard } from '../guards/jwtAuthentication.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  public async login(@Body() data: AdminLoginDto): Promise<AdminLoginOutDto> {
    return this.adminService.login(data);
  }

  @Get('check-login')
  @UseGuards(AdminAuthGuard)
  public async checkLogin(): Promise<void> {
    return;
  }
}
