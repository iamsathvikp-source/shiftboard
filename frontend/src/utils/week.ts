export function startOfWeek(date: Date): Date {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate()-d.getDay());
    return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);       // copy, never change the original
  d.setDate(d.getDate() + days);
  return d;
}

export function weekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' });              // "Wed"
const monthDay = new Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric' }); // "11/11"
const longDay = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); // "Sun, Nov 8"

export const formatDayHeader = (d: Date) => `${dayName.format(d)} ${monthDay.format(d)}`;
export const formatWeekRange = (start: Date) => `${longDay.format(start)} – ${longDay.format(addDays(start, 6))}`;

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}