import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
} from 'typeorm';

import Products from './Products';

@Entity('groups')
export default class Providers {
        @PrimaryGeneratedColumn('increment')
        id: number;

        @Column()
        name: string;

        @OneToMany(() => Products, (product) => product.group, {
          cascade: [
            'remove',
            'update',
          ],
        })
        @JoinColumn({ name: 'group' })
        products: Products[]
}
