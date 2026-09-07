const state = {
  store: {},
};

const ACCESSIBLE = {
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
};

const ACCESS_CONTROL = {
  BIOMETRY_ANY: 'BiometryAny',
};

module.exports = {
  ACCESSIBLE,
  ACCESS_CONTROL,
  setGenericPassword: jest.fn((username, password, options) => {
    state.store[options?.service ?? 'default'] = { username, password };
    return Promise.resolve({ service: options?.service, storage: 'Keychain' });
  }),
  getGenericPassword: jest.fn(options => {
    const entry = state.store[options?.service ?? 'default'];
    return Promise.resolve(
      entry ? { ...entry, service: options?.service } : false,
    );
  }),
  hasGenericPassword: jest.fn(options => {
    return Promise.resolve(Boolean(state.store[options?.service ?? 'default']));
  }),
  resetGenericPassword: jest.fn(options => {
    delete state.store[options?.service ?? 'default'];
    return Promise.resolve(true);
  }),
  __state: state,
};
