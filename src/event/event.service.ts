import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private readonly EventRepository : Repository<Event>,

    private readonly userService : UserService
  ){}

  async create(createEventDto: CreateEventDto) {
    try {
      const {organizer_id, ...eventData} = createEventDto;
      const userOrganizer = await this.userService.findOne(organizer_id);
      const event : Event = this.EventRepository.create({
        ...eventData,
        organizer_id : userOrganizer
      });
      await this.EventRepository.save(event);
      return {
        ...event,
        organizer : userOrganizer.id
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    // const event : Event = await this.EventRepository.findOneBy({id});
    const queryBuilder = this.EventRepository.createQueryBuilder('event');
    const event = await queryBuilder.where('event.id =:eventId',{
      eventId : id
    })
    .leftJoinAndSelect('event.organizer_id', 'userOrganizer')
    .getOne();
    if(!event)
      throw new NotFoundException(`Event with id ${id} not found`)
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
      await this.findOne(id);
      const {organizer_id} = updateEventDto;
      const userOrganizer = await this.userService.findOne(organizer_id);
      const dataEvent = {
        ...updateEventDto,
        organizer_id : userOrganizer
      }
      const eventUpdated = await this.EventRepository.preload({id, ...dataEvent});
      return eventUpdated;
  }

}
