import {
  Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne,
} from 'typeorm';

import Products from './Products';

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    url: string;

    @ManyToOne(() => Products, (product) => product.images)
    @JoinColumn({ name: 'productID' })
    product: Products;
}
