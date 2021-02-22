import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import Providers from './Providers';
import Group from './Group';

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

    @Column()
    actived: boolean;
}
