import { Pressable, StyleSheet, Text, View } from 'react-native';
import { isSameDay } from './dateUtils';

type DayViewProps = {
  selectedDate: Date;
  today: Date;
  onSelectDate: (date: Date) => void;
};

function addDays(date: Date, amount: number) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + amount,
  );
}

export default function DayView({
  selectedDate,
  today,
  onSelectDate,
}: DayViewProps) {
  const isToday = isSameDay(selectedDate, today);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onSelectDate(addDays(selectedDate, -1))} hitSlop={8}>
        <Text style={styles.navArrow}>{'‹'}</Text>
      </Pressable>
      <View style={styles.dayLabelContainer}>
        <Text style={styles.dayLabel}>
          {selectedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        {isToday && <Text style={styles.todayBadge}>Today</Text>}
      </View>
      <Pressable onPress={() => onSelectDate(addDays(selectedDate, 1))} hitSlop={8}>
        <Text style={styles.navArrow}>{'›'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navArrow: { fontSize: 24, color: '#007AFF', paddingHorizontal: 12 },
  dayLabelContainer: { alignItems: 'center' },
  dayLabel: { fontSize: 18, fontWeight: '600' },
  todayBadge: { color: '#007AFF', fontSize: 12, marginTop: 2 },
});
