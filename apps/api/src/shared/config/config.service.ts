import { ValidationPipeOptions } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]): ConfigService {
    keys.forEach((k) => this.getValue(k, true));

    return this;
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value as string;
  }

  public getCustomKey(key: string, throwOnMissing = true): string {
    return this.getValue(key, throwOnMissing);
  }

  public getValidationOptions(transform?: true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      validateCustomDecorators: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }

  public getMongoString(): string {
    return `mongodb://${this.getCustomKey(
      'MONGO_INITDB_ROOT_USERNAME',
    )}:${this.getCustomKey('MONGO_INITDB_ROOT_PASSWORD')}@${this.getCustomKey(
      'MONGO_HOST',
    )}:${this.getCustomKey('MONGO_PORT')}/${this.getCustomKey(
      'MONGO_INITDB_DATABASE',
    )}?authSource=admin`;
  }

  public getHashSalt(): string {
    return this.getValue('HASH_SALT');
  }

  public getJWTConfig() {
    return {
      secret: this.getCustomKey('JWT_SECRET'),
      expiresIn: this.getCustomKey('JWT_TTL'),
    };
  }

  public getSMTPString() {
    return `smtp://${this.getCustomKey('SMTP_USER')}:${this.getCustomKey(
      'SMTP_PASS',
    )}@${this.getCustomKey('SMTP_HOST')}:${this.getCustomKey('SMTP_PORT')}`;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MONGO_INITDB_ROOT_USERNAME',
  'MONGO_INITDB_ROOT_PASSWORD',
  'MONGO_INITDB_DATABASE',
  'MONGO_HOST',
  'MONGO_PORT',
  'JWT_SECRET',
  'JWT_TTL',
  'HASH_SALT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_HOST',
  'SMTP_PORT',
  'FROM_EMAIL',
  'BACKEND_URL',
]);

export { configService };
