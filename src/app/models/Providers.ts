import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
} from 'typeorm';

import Products from './Products';

  @Entity('providers')

export default class Providers {
      @PrimaryGeneratedColumn('increment')
      id: number;

      @Column()
      name: string;

      @Column()
      email: string;

      @Column()
      website: string;

      @Column('simple-array')
      telefone: string[];

      @OneToMany(() => Products, (product) => product.provider, {
        cascade: [
          'remove',
          'update',
        ],
      })
      @JoinColumn({ name: 'providerID' })
      products: Products[]
}
