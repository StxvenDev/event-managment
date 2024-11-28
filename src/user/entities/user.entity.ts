import { Comment } from "src/comment/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users'  })
export class User {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('varchar')
  name : string;

  @Column('varchar', {
    unique : true
  })
  email : string;

  @OneToMany(
    () => Comment,
    (comment) => comment.user,
    {cascade : true, eager : true}
  )
  comments : Comment[];

  @Column('datetime',{
    default : () => 'CURRENT_TIMESTAMP'
  })
  create_at : Date;
}
