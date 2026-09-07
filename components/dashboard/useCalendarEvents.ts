import { useEffect, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';

export type CalendarEvent = {
  id: string;
  dateKey: string;
  title: string;
};

const EVENTS_COLLECTION = 'events';

export default function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return;
    }

    const eventsQuery = query(
      collection(getFirestore(), EVENTS_COLLECTION),
      where('uid', '==', uid),
    );

    return onSnapshot(eventsQuery, snapshot => {
      setEvents(
        snapshot.docs.map(docSnapshot => {
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            dateKey: data.dateKey,
            title: data.title,
          };
        }),
      );
    });
  }, []);

  const addEvent = (dateKey: string, title: string) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      return Promise.resolve();
    }

    return addDoc(collection(getFirestore(), EVENTS_COLLECTION), {
      uid,
      dateKey,
      title,
    }).then(() => undefined);
  };

  const updateEvent = (id: string, title: string) => {
    return updateDoc(doc(getFirestore(), EVENTS_COLLECTION, id), { title });
  };

  return { events, addEvent, updateEvent };
}
