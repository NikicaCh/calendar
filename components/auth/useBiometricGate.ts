import { useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { hasBiometricSession, verifyBiometricSession } from './biometricSession';

export default function useBiometricGate() {
  const [checking, setChecking] = useState(true);
  const [locked, setLocked] = useState(false);
  const appState = useRef<AppStateStatus>(
    (AppState.currentState as AppStateStatus | null | undefined) ?? 'active',
  );

  useEffect(() => {
    let cancelled = false;

    const checkGate = async () => {
      const exists = await hasBiometricSession();
      if (!cancelled) {
        setLocked(exists);
        setChecking(false);
      }
    };

    checkGate();

    const subscription = AppState.addEventListener('change', nextState => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        checkGate();
      }
      appState.current = nextState;
    });

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  const unlock = async () => {
    const success = await verifyBiometricSession();
    if (success) {
      setLocked(false);
    }
    return success;
  };

  return { checking, locked, unlock };
}
