import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { User } from './db_entities/user.entity';

const dbEntities: EntityClassOrSchema[] = [User];

@Module({
  imports: [TypeOrmModule.forFeature(dbEntities)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
