import {
  Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne,
} from 'typeorm';

import Products from './Products';

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @OneToOne(() => Products, (product) => product.images, {
      cascade: [
        'remove',
        'update',
      ],
    })
    @JoinColumn({ name: 'productID' })
    product: Products;
}
