import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';

import Products from './Products';

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Products, (product) => product.images)
    @JoinColumn({ name: 'productID' })
    product: Products;
}