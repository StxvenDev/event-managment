import { IsString } from "class-validator";
import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";

export class CreateCommentDto {

    @IsString()
    content : string;

    
    user : User;

    event : Event;
    create_at : Date;
}
