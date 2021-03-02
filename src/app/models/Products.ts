import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany,
} from 'typeorm';

import Providers from './Providers';
import Group from './Group';
import Images from './Images';

@Entity('products')
export default class Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    productCode: string;

    @ManyToOne(() => Providers, (provider) => provider.products)
    @JoinColumn({ name: 'providerID' })
    provider: Providers;

    @ManyToOne(() => Group, (group) => group.products)
    @JoinColumn({ name: 'groupID' })
    group: Providers;

    @OneToMany(() => Images, (image) => image.product, {
      cascade: [
        'insert',
        'update'
      ]
    })
    @JoinColumn({name: 'productID'})
    images: Images[];

    @Column()
    actived: boolean;
}
