import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CalendarEvent } from './useCalendarEvents';

type EventFormProps = {
  editingEvent: CalendarEvent | null;
  onSave: (title: string) => void;
};

export default function EventForm({ editingEvent, onSave }: EventFormProps) {
  const [title, setTitle] = useState(editingEvent?.title ?? '');

  useEffect(() => {
    setTitle(editingEvent?.title ?? '');
  }, [editingEvent]);

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onSave(trimmedTitle);
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event title"
        value={title}
        onChangeText={setTitle}
      />
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingEvent ? 'Update' : 'Add'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
