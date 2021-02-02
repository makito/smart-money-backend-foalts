// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { WalletsController } from './wallets.controller';

describe('WalletsController', () => {

  let controller: WalletsController;

  beforeEach(() => controller = createController(WalletsController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(WalletsController, 'foo'), 'GET');
      strictEqual(getPath(WalletsController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
