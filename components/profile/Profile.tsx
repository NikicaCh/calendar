import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { clearBiometricSession } from '../auth/biometricSession';

export default function Profile() {
  const handleLogout = async () => {
    await signOut(getAuth());
    await clearBiometricSession().catch(error =>
      console.error('Failed to clear biometric session', error),
    );
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '600' },
});
