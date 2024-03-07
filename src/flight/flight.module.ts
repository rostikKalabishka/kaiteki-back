import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Flight, FlightSchema } from './schemas/flight.schemas';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { getJWTConfig } from 'src/config/jwt.config';

@Module({
  providers: [FlightService],
  controllers: [FlightController],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
  ],
})
export class FlightModule {}
