import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { WalletsController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/wallets', WalletsController),
  ];

  async init() {
    await createConnection();
  }
}
