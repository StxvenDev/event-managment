import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users'  })
export class User {
  @PrimaryGeneratedColumn()
  id : number

  @Column('varchar')
  name : string

  @Column('varchar', {
    unique : true
  })
  email : string

  @Column('datetime',{
    default : () => 'CURRENT_TIMESTAMP'
  })
  create_at : Date
}
