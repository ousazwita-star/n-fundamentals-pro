import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Next,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SongsController } from './songs/songs.controller.js';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware.js';
import { SongsModule } from './songs/songs.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity.js';
import { UsersModule } from './user/users.module.js';
import { User } from './user/user.entity.js';
import { PlaylistModule } from './playlist/playlists.module.js';
import { Playlist } from './playlist/playlist.entity.js';
import { ArtistsModule } from './artists/artists.module.js';
import { Artist } from './artists/artist.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions, typeOrmAsyncConfig } from './db/data-source.js';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.js';
import { validate } from './env.validation.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    UsersModule,
    PlaylistModule,
    ArtistsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(datasource: DataSource) {
    console.log('Database Name is ==> ', datasource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware)
    // .forRoutes('songs')  Option1

    // consumer.apply(LoggerMiddleware)
    // .forRoutes({path : 'songs',method : RequestMethod.POST})  Option2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
