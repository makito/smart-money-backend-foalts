// std
// The `assert` module provides a simple set of assertion tests.
import { ok, strictEqual } from 'assert';

// 3p
import { createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';
import { Connection, createConnection } from 'typeorm';

// App
import { Wallet } from '../entities';
import { WalletsController } from './wallets.controller';

// Define a group of tests.
describe('WalletsController', () => {

  let controller: WalletsController;
  let connection: Connection;

  // Create a connection to the database before running all the tests.
  before(async () => {
    // The connection uses the configuration defined in the file config/test.json.
    // By default, the file has three connection options:
    //  "database": "./test_db.sqlite3" -> Use a different database for running the tests.
    // "synchronize": true ->  Auto create the database schema when the connection is established.
    // "dropSchema": true -> Drop the schema when the connection is established (empty the database).
    connection = await createConnection();
  });

  // Close the database connection after running all the tests whether they succeed or failed.
  after(() => connection.close());

  // Create or re-create the controller before each test.
  beforeEach(() => controller = createController(WalletsController));

  // Define a nested group of tests.
  describe('has a "getAll" method that', () => {

    // Define a unit test.
    it('should handle requests at GET /.', () => {
      // Throw an error and make the test fail if the http method of `getAll` is not GET.
      strictEqual(getHttpMethod(WalletsController, 'getAll'), 'GET');
      // Throw an error and make the test fail if the path of `getAll` is not /.
      strictEqual(getPath(WalletsController, 'getAll'), '/');
    });

    // Define a unit test.
    it('should return an HttpResponseOK.', async () => {
      // Create fake wallets.
      const wallet1 = new Wallet();
      wallet1.name = 'Wallet 1';
      wallet1.amount = 10.0;

      const wallet2 = new Wallet();
      wallet2.name = 'Wallet 2';
      wallet2.amount = 0.0;

      // Save the wallets.
      await connection.manager.save([ wallet1, wallet2 ]);

      const response = await controller.getAll();
      ok(isHttpResponseOK(response), 'response should be an instance of HttpResponseOK.');

      const body = response.body;

      ok(Array.isArray(body), 'The body of the response should be an array.');
      strictEqual(body[0].name, 'Wallet 1');
      strictEqual(body[0].amount, 10.0);
      strictEqual(body[1].name, 'Wallet 2');
      strictEqual(body[1].amount, 0.0);
    });

  });

});
