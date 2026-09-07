import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function useHeaderNavigation() {
  const navigation = useNavigation<Navigation>();
  const canGoBack = useNavigationState(state => state.index > 0);

  return {
    canGoBack,
    goBack: () => navigation.goBack(),
    goToProfile: () => navigation.navigate('Profile'),
  };
}
