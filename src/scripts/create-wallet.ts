// 3p
import { createConnection } from 'typeorm';

import { Wallet } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    amount: { type: 'number' }
  },
  required: ['name'],
  type: 'object',
};

export async function main(args: any) {
  const connection = await createConnection();

  try {
    const wallet = new Wallet();
    wallet.name = args.name;
    console.log(await wallet.save());
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
