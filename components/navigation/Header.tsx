import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useHeaderNavigation from './useHeaderNavigation';

export default function Header() {
  const { canGoBack, goBack, goToProfile } = useHeaderNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {canGoBack ? (
        <Pressable onPress={goBack}>
          <Text style={styles.link}>{'← Back'}</Text>
        </Pressable>
      ) : (
        <Text>Calendar</Text>
      )}
      <Pressable onPress={goToProfile}>
        <Text style={styles.link}>Profile</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#aaa',
  },
  link: { color: '#007AFF' },
});
