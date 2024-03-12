import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from './config/mongo.config';

import { RolesModule } from './roles/roles.module';

import { TracksModule } from './tracks/tracks.module';
import { TrailersModule } from './trailers/trailers.module';
import { FlightModule } from './flight/flight.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    UsersModule,

    AuthModule,

    RolesModule,

    TracksModule,

    TrailersModule,

    FlightModule,

    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
