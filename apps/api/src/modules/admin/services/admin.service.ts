import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configService } from '@shared/config/config.service';
import crypto from 'crypto';

import { AdminLoginDto } from '../dtos/in/admin-login.dto';
import { AdminLoginOutDto } from '../dtos/out/admin-login-out.dto';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(data: AdminLoginDto): Promise<AdminLoginOutDto> {
    const passwordHash = this.createHash(data.password);
    const admin = await this.adminRepository.findByCredentials({
      email: data.email,
      passwordHash,
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      { sub: admin._id },
      configService.getJWTConfig(),
    );

    return {
      email: admin.email,
      accessToken,
    };
  }

  private createHash(value: string): string {
    const hashSalt = crypto
      .createHash('sha256')
      .update(configService.getHashSalt(), 'utf8')
      .digest('hex');

    return crypto
      .createHash('sha256')
      .update(value)
      .update(hashSalt)
      .digest('hex');
  }
}
