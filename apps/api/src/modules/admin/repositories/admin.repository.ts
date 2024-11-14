import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '@shared/database/schemas/admin.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<Admin>,
  ) {}

  public async findByCredentials(data: {
    email: string;
    passwordHash: string;
  }): Promise<Admin | null> {
    return this.adminRepository.findOne(data).exec();
  }
}
