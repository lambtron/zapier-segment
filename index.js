const authentication = require('./authentication');
const writeKeyTrigger = require('./triggers/write_key.js');
const trackCreate = require('./creates/track.js');
const identifyCreate = require('./creates/identify.js');
const hydrators = require('./hydrators');

const fs = require('fs');
const scriptingSource = fs.readFileSync('./scripting.js', { encoding: 'utf8' });

const beforeRequest = (request, z, bundle) => {
  return z.legacyScripting.beforeRequest(request, z, bundle);
};

const afterResponse = (response, z, bundle) => {
  return z.legacyScripting.afterResponse(response, z, bundle);
};

module.exports = {
  searches: {},
  beforeRequest: [beforeRequest],
  legacy: {
    searches: {},
    scriptingSource: scriptingSource,
    needsTriggerData: false,
    triggers: {
      writeKey: {
        operation: {
          url: 'https://{{bundle.authData.writeKey}}:@api.segment.io/v1/import'
        }
      }
    },
    loadCustomFieldsEarly: false,
    creates: {
      track: {
        operation: {
          url: 'https://api.segment.io/v1/track',
          fieldsExcludedFromBody: [
            'name',
            'source',
            'medium',
            'term',
            'content'
          ]
        }
      },
      identify: {
        operation: {
          url: 'https://api.segment.io/v1/identify',
          fieldsExcludedFromBody: [
            'name',
            'source',
            'medium',
            'term',
            'content'
          ]
        }
      }
    },
    authentication: {
      testTrigger: 'writeKey',
      placement: 'header',
      mapping: { username: '{{writeKey}}', password: '' }
    },
    needsFlattenedData: false
  },
  triggers: { [writeKeyTrigger.key]: writeKeyTrigger },
  afterResponse: [afterResponse],
  creates: {
    [trackCreate.key]: trackCreate,
    [identifyCreate.key]: identifyCreate
  },
  authentication: authentication,
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  hydrators: hydrators
};
