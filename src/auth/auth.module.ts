import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

import { UsersModule } from '../user/users.module.js';
import { ArtistsModule } from '../artists/artists.module.js';
import { ArtistsService } from '../artists/artists.service.js';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWTStrategy } from './jwt-strategy.js';

@Module({
  imports: [
    ConfigModule,

    PassportModule,

    UsersModule,

    ArtistsModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),

        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JWTStrategy,
  ],

  exports: [AuthService],
})
export class AuthModule {}