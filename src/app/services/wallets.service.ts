import { Wallet, IWallet } from '../entities/wallet.entity';

export class WalletsService {

  /**
   * create wallet from body data
   * @param param0 wallet model
   */
  async createWallet({ name, amount }: IWallet) {
    const wallet = new Wallet();

    wallet.name = name;
    wallet.amount = amount;

    return await wallet.save();
  }

  /**
   * update wallet by id
   * @param id wallet id
   * @param param1 wallet model
   */
  async updateWallet(id: number, { name, amount }: IWallet) {
    const wallet = new Wallet();

    if (name) {
      wallet.name = name;
    }
    if (amount !== undefined) {
      wallet.amount = amount;
    }

    await Wallet.update(id, wallet);
  }

}
