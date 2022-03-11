
/**
 * Module dependencies.
 */

const Analytics = require('analytics-node');
const omitEmpty = require('omit-empty');
const moment = require('moment');

/**
 * Perform.
 */

const perform = (z, bundle) => {

  // Get writeKey and instantiate analytics client.
  const writeKey = bundle.authData.writeKey;
  const analytics = new Analytics(writeKey);

  // Promisify `identify`.
  const identify = function identify(params) {
    return new Promise((resolve, reject) => {
      analytics.identify(params, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  // Grab and format relevant data.
  const userId = bundle.inputData.userId;
  const anonymousId = bundle.inputData.anonymousId;
  const context = bundle.inputData.context ? JSON.parse(bundle.inputData.context) : '';
  const traits = bundle.inputData.traits ? JSON.parse(bundle.inputData.traits) : '';
  const integrations = bundle.inputData.integrations ? JSON.parse(bundle.inputData.integrations) : '';
  let timestamp = bundle.inputData.timestamp;

  // If both userId or anonId don't exist, then error out.
  if (!userId && !anonymousId) {
    throw new Error('Either `userId` or `anonymousId` must be provided.');
  }

  // Convert timestamp to right format or omit.
  if (moment(timestamp).isValid()) {
    timestamp = moment(timestamp).toDate();
  } else {
    timestamp = null;
  }

  // Construct params.
  const params = omitEmpty({
    userId: userId,
    anonymousId: anonymousId,
    traits: traits,
    context: context,
    timestamp: timestamp,
    integrations: integrations
  });

  // Send identify call.
  return identify(params)
  .then(() => {
    z.console.log('Success!');
    return { status: 200 };
  }).catch(error => {
    z.console.log(error);
  })
};

/**
 * Export.
 */

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        type: 'string',
        required: false,
        helpText:
          'Either the `userId` or an `anonymousId` is required. More information [here](https://segment.com/docs/spec/track/).',
        key: 'userId',
        label: 'User ID'
      },
      {
        type: 'string',
        required: false,
        helpText:
          'Either the `userId` or an `anonymousId` is required. More information [here](https://segment.com/docs/spec/track/). Randomly generate an `anonymousId` [here](https://www.uuidgenerator.net/).',
        key: 'anonymousId',
        label: 'Anonymous ID'
      },
      {
        type: 'string',
        required: false,
        helpText:
          'The time the event occurred as an ISO-8601 format datestring.',
        key: 'timestamp',
        label: 'timestamp'
      },
      {
        required: false,
        label: 'Traits',
        helpText:
        'Custom [traits](https://segment.com/docs/spec/identify/#traits) for the user as a JSON object string.',
        type: 'text',
        key: 'traits'
      },
      {
        required: false,
        label: 'Context',
        helpText:
        'Dictionary of extra info that provides useful context about the event as a JSON object string.',
        type: 'text',
        key: 'context'
      },
      {
        required: false,
        label: 'Integrations',
        helpText:
        'A dictionary of destinations to enable or disable as a JSON object string.',
        type: 'text',
        key: 'integrations'
      }
    ]
  },
  noun: 'User',
  display: {
    hidden: false,
    important: true,
    description:
      'Send an [identify](https://segment.com/docs/spec/identify/) call.',
    label: 'Identify User'
  },
  key: 'identify'
};
