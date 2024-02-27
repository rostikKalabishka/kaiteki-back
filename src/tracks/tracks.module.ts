import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Track, TrackSchema } from './schemas/track.schema';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ConfigModule,
  ],
})
export class TracksModule {}
