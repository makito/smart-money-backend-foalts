// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallets')
export class Wallet extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', type: 'varchar', length: 25, nullable: false })
  name: string;

  @Column({ default: 0.0, type: 'float', nullable: false, precision: 10, scale: 2 })
  amount: number;

}

export interface IWallet {
  name: string;
  amount: number;
}
