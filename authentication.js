const testAuth = (z, bundle) => {
  return z.legacyScripting.run(bundle, 'trigger', 'writeKey');
};

module.exports = {
  test: testAuth,
  fields: [
    {
      type: 'string',
      required: true,
      helpText: "This is your Segment project's writeKey.",
      key: 'writeKey',
      label: 'writeKey'
    }
  ],
  type: 'basic',
  customConfig: {}
};
