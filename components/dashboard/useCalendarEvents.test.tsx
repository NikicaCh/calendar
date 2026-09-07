import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import useCalendarEvents, { type CalendarEvent } from './useCalendarEvents';

const authMock = require('@react-native-firebase/auth');
const firestoreMock = require('@react-native-firebase/firestore');

type Hook = ReturnType<typeof useCalendarEvents>;

function renderHook(onReady: (hook: Hook) => void) {
  function TestHarness({ onReady: ready }: { onReady: (hook: Hook) => void }) {
    ready(useCalendarEvents());
    return null;
  }

  ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<TestHarness onReady={onReady} />);
  });
}

describe('useCalendarEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authMock.__mockAuthInstance.currentUser = { uid: 'user-1' };
  });

  test('subscribes to events scoped to the signed-in user', () => {
    renderHook(() => {});

    expect(firestoreMock.where).toHaveBeenCalledWith('uid', '==', 'user-1');
    expect(firestoreMock.onSnapshot).toHaveBeenCalled();
  });

  test('reflects events emitted by the snapshot listener', () => {
    let hook: Hook | undefined;
    renderHook(h => {
      hook = h;
    });

    ReactTestRenderer.act(() => {
      firestoreMock.__state.snapshotCallback({
        docs: [
          { id: 'e1', data: () => ({ dateKey: '2026-8-6', title: 'Standup' }) },
        ],
      });
    });

    expect(hook?.events).toEqual<CalendarEvent[]>([
      { id: 'e1', dateKey: '2026-8-6', title: 'Standup' },
    ]);
  });

  test('addEvent writes a new document scoped to the signed-in user', async () => {
    let hook: Hook | undefined;
    renderHook(h => {
      hook = h;
    });

    await ReactTestRenderer.act(async () => {
      await hook?.addEvent('2026-8-6', 'Standup');
    });

    expect(firestoreMock.addDoc).toHaveBeenCalledWith(expect.anything(), {
      uid: 'user-1',
      dateKey: '2026-8-6',
      title: 'Standup',
    });
  });

  test('updateEvent updates the given document by id', async () => {
    let hook: Hook | undefined;
    renderHook(h => {
      hook = h;
    });

    await ReactTestRenderer.act(async () => {
      await hook?.updateEvent('e1', 'Updated title');
    });

    expect(firestoreMock.doc).toHaveBeenCalledWith(
      expect.anything(),
      'events',
      'e1',
    );
    expect(firestoreMock.updateDoc).toHaveBeenCalledWith(expect.anything(), {
      title: 'Updated title',
    });
  });
});
