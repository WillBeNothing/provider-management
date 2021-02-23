import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    // eslint-disable-next-line camelcase
    password_hash:string;
}
