import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column()
  mobile: string;

  @Column()
  github: string;

  @Column()
  linkin: string;
}
