import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ViewMode = 'month' | 'day';

type ViewToggleProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

const OPTIONS: { mode: ViewMode; label: string }[] = [
  { mode: 'month', label: 'Month' },
  { mode: 'day', label: 'Day' },
];

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <View style={styles.container}>
      {OPTIONS.map(option => {
        const isActive = option.mode === mode;
        return (
          <Pressable
            key={option.mode}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onChange(option.mode)}>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e5e5ea',
    borderRadius: 8,
    padding: 2,
    marginBottom: 16,
  },
  pill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#fff',
  },
  label: { fontSize: 14, fontWeight: '600', color: '#666' },
  labelActive: { color: '#000' },
});
