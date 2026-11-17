import { Shift } from "../types";

export const HOSPITAL_TIME_ZONE = 'America/Toronto';

const dateInHospital = new Intl.DateTimeFormat('en-US', {
    timeZone: HOSPITAL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

const timeInHospital = new Intl.DateTimeFormat('en-US', {
    timeZone: HOSPITAL_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
})

const dayInHospital = new Intl.DateTimeFormat('en-US', {
  timeZone: HOSPITAL_TIME_ZONE,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

export function scheduleDate(shift: Shift): string {
  const parts = dateInHospital.formatToParts(new Date(shift.startDatetime));
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function formatShiftTime(shift: Shift): string {
    const start = timeInHospital.format(new Date(shift.startDatetime));
    const end = timeInHospital.format(new Date(shift.endDatetime));
    return `${start} - ${end}`;
}

export function hasBreak(shift: Shift): boolean {
    return shift.segments.some((segment) => segment.type === 'BREAK');
}

export const cellKey = (employeeId: number, isoDate: string) => `${employeeId}|${isoDate}`;

export function groupByCell(shifts: Shift[]): Map<string, Shift[]> {
    const map = new Map<string, Shift[]>();
    for (const shift of shifts) {
        const key = cellKey(shift.employeeId, scheduleDate(shift));
        const list = map.get(key) ?? [];
        list.push(shift);
        map.set(key, list);
    }
    return map;
}

// "7:00 AM"
export function formatTime(iso: string): string {
  return timeInHospital.format(new Date(iso));
}

// Duration between two moments as "8:30" (hours:minutes)
export function formatDuration(startIso: string, endIso: string): string {
  const minutes = Math.round((Date.parse(endIso) - Date.parse(startIso)) / 60000);
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}

export function formatShiftDate(shift: Shift): string {
  const start = dayInHospital.format(new Date(shift.startDatetime));
  const end = dayInHospital.format(new Date(shift.endDatetime));
  return start === end ? start : `${start} – ${end}`;
}