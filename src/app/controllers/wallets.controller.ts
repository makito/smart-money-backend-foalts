import {
  Context,
  Delete,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  Put
} from '@foal/core';

import { Wallet } from '../entities';

export class WalletsController {

  @Get('/')
  async getAll() {
    const wallets = await Wallet.find();
    return new HttpResponseOK(wallets);
  }

  @Get('/:id')
  async getOne(ctx: Context) {
    const wallet = await Wallet.findOne({ id: ctx.request.params.id });

    return !wallet ?
      new HttpResponseNotFound() :
      new HttpResponseOK(wallet);
  }

  @Post('/')
  async create(ctx: Context) {
    const wallet = new Wallet();

    wallet.name = ctx.request.body.name;
    wallet.amount = ctx.request.body.amount;

    await wallet.save();

    return new HttpResponseCreated(wallet);
  }

  @Put('/:id')
  async update(ctx: Context) {
    const wallet = new Wallet();

    wallet.name = ctx.request.body.name;
    wallet.amount = ctx.request.body.amount;

    await Wallet.update(ctx.request.params.id, wallet);

    return new HttpResponseOK(wallet);
  }

  @Delete('/:id')
  async remove(ctx: Context) {
    const wallet = await Wallet.findOne({ id: ctx.request.params.id });

    if (!wallet) {
      return new HttpResponseNotFound();
    }

    await wallet.remove();

    return new HttpResponseNoContent();
  }

}
