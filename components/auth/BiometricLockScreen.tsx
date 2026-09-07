import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type BiometricLockScreenProps = {
  onUnlock: () => Promise<boolean>;
};

export default function BiometricLockScreen({
  onUnlock,
}: BiometricLockScreenProps) {
  const [error, setError] = useState('');

  const attemptUnlock = async () => {
    setError('');
    const success = await onUnlock();
    if (!success) {
      setError('Authentication failed. Try again.');
    }
  };

  useEffect(() => {
    attemptUnlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locked</Text>
      <Text style={styles.subtitle}>
        Unlock with Face ID or Touch ID to continue
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={attemptUnlock}>
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  error: { color: 'red', marginBottom: 16 },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    paddingHorizontal: 32,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
