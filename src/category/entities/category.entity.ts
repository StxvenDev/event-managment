import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar',{
        unique : true
    })
    name : string;

    @Column('varchar')
    description : string;
}
