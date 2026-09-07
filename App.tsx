/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, type User } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/navigation/Header';
import NavBar from './components/navigation/NavBar';
import AuthScreen from './components/auth/AuthScreen';
import BiometricLockScreen from './components/auth/BiometricLockScreen';
import useBiometricGate from './components/auth/useBiometricGate';
import Calendar from './components/dashboard/Calendar';
import Profile from './components/profile/Profile';
import type { RootStackParamList } from './components/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Authenticated() {
  const { checking, locked, unlock } = useBiometricGate();

  if (checking) {
    return null;
  }

  if (locked) {
    return <BiometricLockScreen onUnlock={unlock} />;
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <NavBar />
        <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
          <Stack.Screen name="Dashboard" component={Calendar} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(getAuth(), authUser => {
      setUser(authUser);
      setInitializing(false);
    });
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {!user ? <AuthScreen /> : <Authenticated />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
