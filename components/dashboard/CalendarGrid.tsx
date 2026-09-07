import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getMonthGrid, isSameDay, toDateKey } from './dateUtils';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CELL_SIZE = `${100 / 7}%` as const;

type CalendarGridProps = {
  visibleMonth: Date;
  selectedDate: Date;
  today: Date;
  eventDates: Set<string>;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function CalendarGrid({
  visibleMonth,
  selectedDate,
  today,
  eventDates,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const days = getMonthGrid(visibleMonth.getFullYear(), visibleMonth.getMonth());

  return (
    <View>
      <View style={styles.monthHeader}>
        <Pressable onPress={onPrevMonth} hitSlop={8}>
          <Text style={styles.navArrow}>{'‹'}</Text>
        </Pressable>
        <Text style={styles.monthLabel}>
          {visibleMonth.toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Pressable onPress={onNextMonth} hitSlop={8}>
          <Text style={styles.navArrow}>{'›'}</Text>
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAY_LABELS.map(label => (
          <Text key={label} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map(day => {
          const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day, selectedDate);
          const hasEvents = eventDates.has(toDateKey(day));

          return (
            <Pressable
              key={day.toISOString()}
              style={[styles.cell, isSelected && styles.cellSelected]}
              onPress={() => onSelectDate(day)}>
              <Text
                style={[
                  styles.cellText,
                  !inCurrentMonth && styles.cellTextMuted,
                  isToday && styles.cellTextToday,
                  isSelected && styles.cellTextSelected,
                ]}>
                {day.getDate()}
              </Text>
              {hasEvents && (
                <View
                  style={[styles.eventDot, isSelected && styles.eventDotSelected]}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthLabel: { fontSize: 18, fontWeight: '600' },
  navArrow: { fontSize: 24, color: '#007AFF', paddingHorizontal: 12 },
  weekRow: { flexDirection: 'row' },
  weekdayLabel: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: CELL_SIZE,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellSelected: {
    backgroundColor: '#007AFF',
    borderRadius: 999,
  },
  cellText: { fontSize: 16 },
  cellTextMuted: { color: '#bbb' },
  cellTextToday: { color: '#007AFF', fontWeight: '700' },
  cellTextSelected: { color: '#fff', fontWeight: '700' },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginTop: 2,
  },
  eventDotSelected: { backgroundColor: '#fff' },
});
