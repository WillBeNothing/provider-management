import {
  Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import Products from './Products';

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Products, (product) => product.images)
    @JoinColumn({ name: 'productID' })
    product: Products;
}
