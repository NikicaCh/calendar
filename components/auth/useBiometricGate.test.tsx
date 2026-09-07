import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import useBiometricGate from './useBiometricGate';

const keychainMock = require('react-native-keychain');

type Hook = ReturnType<typeof useBiometricGate>;

async function renderHook(onReady: (hook: Hook) => void) {
  function TestHarness({ onReady: ready }: { onReady: (hook: Hook) => void }) {
    ready(useBiometricGate());
    return null;
  }

  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<TestHarness onReady={onReady} />);
  });
}

describe('useBiometricGate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    keychainMock.__state.store = {};
  });

  test('does not lock when no biometric session was previously enabled', async () => {
    let hook: Hook | undefined;
    await renderHook(h => {
      hook = h;
    });

    expect(hook?.checking).toBe(false);
    expect(hook?.locked).toBe(false);
  });

  test('locks when a biometric session was previously enabled', async () => {
    keychainMock.__state.store['calendar-biometric-session'] = {
      username: 'biometric-session',
      password: 'true',
    };

    let hook: Hook | undefined;
    await renderHook(h => {
      hook = h;
    });

    expect(hook?.locked).toBe(true);
  });

  test('unlock succeeds when biometric verification passes', async () => {
    keychainMock.__state.store['calendar-biometric-session'] = {
      username: 'biometric-session',
      password: 'true',
    };

    let hook: Hook | undefined;
    await renderHook(h => {
      hook = h;
    });

    let result: boolean | undefined;
    await ReactTestRenderer.act(async () => {
      result = await hook?.unlock();
    });

    expect(result).toBe(true);
    expect(hook?.locked).toBe(false);
  });

  test('unlock fails when biometric verification is rejected', async () => {
    keychainMock.__state.store['calendar-biometric-session'] = {
      username: 'biometric-session',
      password: 'true',
    };
    keychainMock.getGenericPassword.mockResolvedValueOnce(false);

    let hook: Hook | undefined;
    await renderHook(h => {
      hook = h;
    });

    let result: boolean | undefined;
    await ReactTestRenderer.act(async () => {
      result = await hook?.unlock();
    });

    expect(result).toBe(false);
    expect(hook?.locked).toBe(true);
  });
});
