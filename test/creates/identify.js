require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - identify', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        writeKey: process.env.WRITE_KEY,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      },

      inputData: {}
    };

    const result = await appTester(
      App.creates['identify'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
