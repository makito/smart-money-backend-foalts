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
  ValidateBody,
  ValidatePathParam
} from '@foal/core';

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
   */
  @Get('/:id')
  @ValidatePathParam('id', { type: 'number' })
  async getOne(ctx: Context) {
    const wallet = await Wallet.findOne({ id: ctx.request.params.id });

    return !wallet ?
      new HttpResponseNotFound() :
      new HttpResponseOK(wallet);
  }

  /**
   * create wallet from model
   * @param ctx context
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
  async create(ctx: Context) {
    const wallet = new Wallet();

    wallet.name = ctx.request.body.name;
    wallet.amount = ctx.request.body.amount;

    await wallet.save();

    return new HttpResponseCreated(wallet);
  }

  /**
   * update wallet by id
   * @param ctx context
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
  async update(ctx: Context) {
    const wallet = new Wallet();

    if (ctx.request.body.name) {
      wallet.name = ctx.request.body.name;
    }
    if (ctx.request.body.amount !== undefined) {
      wallet.amount = ctx.request.body.amount;
    }

    await Wallet.update(ctx.request.params.id, wallet);

    return new HttpResponseOK(wallet);
  }

  /**
   * remove wallet by id
   * @param ctx context
   */
  @Delete('/:id')
  @ValidatePathParam('id', { type: 'number' })
  async remove(ctx: Context) {
    const wallet = await Wallet.findOne({ id: ctx.request.params.id });

    if (!wallet) {
      return new HttpResponseNotFound();
    }

    await wallet.remove();

    return new HttpResponseNoContent();
  }

}
