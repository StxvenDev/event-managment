import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Event } from './entities/event.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Event, Comment])
  ],
  exports: [
    EventService,
    TypeOrmModule
  ]
})
export class EventModule {}
