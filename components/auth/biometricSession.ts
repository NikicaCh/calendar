import {
  ACCESSIBLE,
  ACCESS_CONTROL,
  getGenericPassword,
  hasGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';

const SERVICE = 'calendar-biometric-session';

export function enableBiometricSession() {
  return setGenericPassword('biometric-session', 'true', {
    service: SERVICE,
    accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
  });
}

export function hasBiometricSession() {
  return hasGenericPassword({ service: SERVICE });
}

export async function verifyBiometricSession(): Promise<boolean> {
  const result = await getGenericPassword({
    service: SERVICE,
    authenticationPrompt: { title: 'Unlock Calendar' },
  });
  return result !== false;
}

export function clearBiometricSession() {
  return resetGenericPassword({ service: SERVICE });
}
