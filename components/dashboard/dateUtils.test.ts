import { getMonthGrid, isSameDay, toDateKey } from './dateUtils';

describe('getMonthGrid', () => {
  test('pads leading days from the previous month so the grid starts on Sunday', () => {
    // September 2026 starts on a Tuesday
    const grid = getMonthGrid(2026, 8);
    expect(grid[0]).toEqual(new Date(2026, 7, 30));
    expect(grid[1]).toEqual(new Date(2026, 7, 31));
    expect(grid[2]).toEqual(new Date(2026, 8, 1));
  });

  test('includes every day of the month', () => {
    const grid = getMonthGrid(2026, 8);
    const daysInMonth = grid.filter(day => day.getMonth() === 8);
    expect(daysInMonth).toHaveLength(30);
  });

  test('pads trailing days so the grid length is a multiple of 7', () => {
    const grid = getMonthGrid(2026, 8);
    expect(grid.length % 7).toBe(0);
  });

  test('handles a leap year February correctly', () => {
    const grid = getMonthGrid(2028, 1);
    const daysInMonth = grid.filter(day => day.getMonth() === 1);
    expect(daysInMonth).toHaveLength(29);
  });
});

describe('isSameDay', () => {
  test('returns true for the same calendar day at different times', () => {
    expect(
      isSameDay(new Date(2026, 8, 6, 1, 0), new Date(2026, 8, 6, 23, 59)),
    ).toBe(true);
  });

  test('returns false for different days', () => {
    expect(isSameDay(new Date(2026, 8, 6), new Date(2026, 8, 7))).toBe(false);
  });
});

describe('toDateKey', () => {
  test('produces a stable, unique key per calendar day', () => {
    expect(toDateKey(new Date(2026, 8, 6))).toBe('2026-8-6');
  });

  test('produces different keys for different days', () => {
    expect(toDateKey(new Date(2026, 8, 6))).not.toBe(
      toDateKey(new Date(2026, 8, 7)),
    );
  });
});
