import {
  Context,
  Delete,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  Put,
  ValidatePathParam
} from '@foal/core';
import { ValidateBody } from '@foal/typestack';

import { Wallet } from '../entities';

export class WalletsController {

  /**
   * get all wallets
   */
  @Get('/')
  async getAll() {
    const wallets = await Wallet.find();
    return new HttpResponseOK(wallets);
  }

  /**
   * get wallet by id
   * @param ctx context
   * @param param1 request parameters
   */
  @Get('/:id')
  @ValidatePathParam('id', { type: 'number' })
  async getOne(ctx: Context, { id }) {
    const wallet = await Wallet.findOne({ id });

    return !wallet ?
      new HttpResponseNotFound() :
      new HttpResponseOK(wallet);
  }

  /**
   * create wallet from model
   * @param ctx context
   * @param params request parameters
   * @param body request body
   */
  @Post('/')
  @ValidateBody(Wallet)
  async create(ctx: Context, params: any, wallet: Wallet) {
    return new HttpResponseCreated(await wallet.save());
  }

  /**
   * update wallet
   * @param ctx context
   * @param param1 request parameters
   * @param body request body
   */
  @Put('/:id')
  @ValidatePathParam('id', { type: 'number' })
  @ValidateBody(Wallet)
  async update(ctx: Context, { id }, wallet: Wallet) {
    return new HttpResponseOK(await Wallet.update(id, wallet));
  }

  /**
   * remove wallet by id
   * @param ctx context
   * @param param1 request parameters
   */
  @Delete('/:id')
  @ValidatePathParam('id', { type: 'number' })
  async remove(ctx: Context, { id }) {
    const wallet = await Wallet.findOne({ id });

    if (!wallet) {
      return new HttpResponseNotFound();
    }

    await wallet.remove();

    return new HttpResponseNoContent();
  }

}
