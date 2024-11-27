import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'events' })
export class Event {
    @PrimaryGeneratedColumn()
    id              : number;

    @Column('varchar',{
        unique : true
    })
    title           : string;

    @Column('text')
    description     : string;

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    date            : Date;

    @Column('varchar')
    location        : string;

    @OneToOne(() => User)
    @JoinColumn()
    organizer_id    : User;

    @Column('datetime',{
        default : () => 'CURRENT_TIMESTAMP'
    })
    create_at       : Date;

}
