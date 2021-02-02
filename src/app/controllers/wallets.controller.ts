import {
  Context,
  Delete,
  dependency,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  Put,
  ValidateBody,
  ValidatePathParam
} from '@foal/core';

import { Wallet, IWallet } from '../entities/wallet.entity';
import { WalletsService } from '../services';

export class WalletsController {
  @dependency
  walletsService: WalletsService;

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
  @ValidateBody({
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      amount: { type: 'number' }
    },
    required: [ 'name' ],
    type: 'object',
  })
  async create(ctx: Context, params: any, body: IWallet) {
    const wallet = await this.walletsService.createWallet(body);
    return new HttpResponseCreated(wallet);
  }

  /**
   * update wallet
   * @param ctx context
   * @param param1 request parameters
   * @param body request body
   */
  @Put('/:id')
  @ValidatePathParam('id', { type: 'number' })
  @ValidateBody({
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      amount: { type: 'number' }
    },
    required: [],
    type: 'object',
  })
  async update(ctx: Context, { id }, body: IWallet) {
    const wallet = await this.walletsService.updateWallet(id, body);
    return new HttpResponseOK(wallet);
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
