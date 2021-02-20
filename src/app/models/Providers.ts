import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
  } from 'typeorm';


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

      @Column()
      telefone: string;
    
  }