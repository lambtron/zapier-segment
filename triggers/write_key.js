const perform = (z, bundle) => {
  return z.legacyScripting.run(bundle, 'trigger', 'writeKey');
};

module.exports = {
  operation: { perform: perform, sample: { id: 'TODO' }, canPaginate: false },
  noun: 'Project',
  display: {
    directions:
      'Log into your service and paste the below URL into the webhook setup field.',
    hidden: true,
    important: false,
    description: 'This is the test trigger to test authentication.',
    label: 'Test Trigger'
  },
  key: 'writeKey'
};
