const legacyMethodHydrator = (z, bundle) => {
  return z.legacyScripting.run(bundle, 'hydrate.method');
};

const legacyFileHydrator = (z, bundle) => {
  return z.legacyScripting.run(bundle, 'hydrate.file');
};

module.exports = {
  legacyMethodHydrator: legacyMethodHydrator,
  legacyFileHydrator: legacyFileHydrator
};
