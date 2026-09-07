import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CalendarEvent } from './useCalendarEvents';

type EventListProps = {
  selectedDate: Date;
  events: CalendarEvent[];
  onEditEvent: (event: CalendarEvent) => void;
};

export default function EventList({
  selectedDate,
  events,
  onEditEvent,
}: EventListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Events for{' '}
        {selectedDate.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
      </Text>

      {events.length === 0 ? (
        <Text style={styles.emptyText}>No events</Text>
      ) : (
        events.map(event => (
          <Pressable
            key={event.id}
            style={styles.eventRow}
            onPress={() => onEditEvent(event)}>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </Pressable>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  heading: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  emptyText: { color: '#999', marginBottom: 12 },
  eventRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTitle: { fontSize: 15 },
});
