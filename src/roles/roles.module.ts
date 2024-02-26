import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { Roles, RolesSchema } from './schemas/role.schemas';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
    ConfigModule,
  ],
})
export class RolesModule {}
