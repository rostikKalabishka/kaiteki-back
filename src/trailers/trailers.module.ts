import { Module } from '@nestjs/common';
import { TrailersController } from './trailers.controller';
import { TrailersService } from './trailers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Trailer, TrailerSchema } from './schemas/trailer.schemas';

@Module({
  controllers: [TrailersController],
  providers: [TrailersService],
  imports: [
    MongooseModule.forFeature([{ name: Trailer.name, schema: TrailerSchema }]),
    ConfigModule,
  ],
})
export class TrailersModule {}
