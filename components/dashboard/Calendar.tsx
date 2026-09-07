import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CalendarGrid from './CalendarGrid';
import DayView from './DayView';
import ViewToggle, { type ViewMode } from './ViewToggle';
import EventList from './EventList';
import EventForm from './EventForm';
import useCalendarEvents, { type CalendarEvent } from './useCalendarEvents';
import { toDateKey } from './dateUtils';

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const { events, addEvent, updateEvent } = useCalendarEvents();

  const selectedDateKey = toDateKey(selectedDate);
  const eventsForSelectedDate = events.filter(
    event => event.dateKey === selectedDateKey,
  );
  const eventDates = useMemo(
    () => new Set(events.map(event => event.dateKey)),
    [events],
  );

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setVisibleMonth(prev =>
      prev.getFullYear() === date.getFullYear() && prev.getMonth() === date.getMonth()
        ? prev
        : new Date(date.getFullYear(), date.getMonth(), 1),
    );
  };

  const saveEvent = (title: string) => {
    const save = editingEvent
      ? updateEvent(editingEvent.id, title)
      : addEvent(selectedDateKey, title);
    save.catch(error => console.error('Failed to save event', error));
    setEditingEvent(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ViewToggle mode={viewMode} onChange={setViewMode} />

      {viewMode === 'month' ? (
        <CalendarGrid
          visibleMonth={visibleMonth}
          selectedDate={selectedDate}
          today={today}
          eventDates={eventDates}
          onSelectDate={selectDate}
          onPrevMonth={() =>
            setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
          }
          onNextMonth={() =>
            setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
          }
        />
      ) : (
        <DayView selectedDate={selectedDate} today={today} onSelectDate={selectDate} />
      )}

      <EventList
        selectedDate={selectedDate}
        events={eventsForSelectedDate}
        onEditEvent={setEditingEvent}
      />

      <EventForm editingEvent={editingEvent} onSave={saveEvent} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingTop: 16, paddingHorizontal: 16, paddingBottom: 40 },
});
