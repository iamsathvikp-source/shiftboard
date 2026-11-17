import { useEffect,  useState } from 'react';
import type { Employee, PageResponse, Shift } from '../types';
import { formatWeekRange, startOfWeek, weekDays, toIsoDate } from '../utils/week';
import { ScheduleGrid } from './ScheduleGrid';
import { ShiftPanel } from './ShiftPanel';


//we need days and employees to show on the page, for now.
export function SchedulePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);

    const selectedShift = shifts.find((s) => s.id === selectedShiftId);
    const selectedEmployee = employees.find((e) => e.id === selectedShift?.employeeId);

    const weekStart = startOfWeek(new Date());
    const days = weekDays(weekStart);

    useEffect(() => {

        const getJson = <T,>(url: string): Promise<T> =>
            fetch(url).then((res) => {
                if (!res.ok) throw new Error(`Couldn't load ${url} (HTTP ${res.status})`);
                return res.json() as Promise<T>;
            });

        Promise.all([
            getJson<PageResponse<Employee>>('/api/v1/employees?page=0&size=100'),
            getJson<Shift[]>(`/api/v1/shifts?weekStart=${toIsoDate(weekStart)}`)
        ])
            .then(([employeePage, weekShifts]) => {
                setEmployees(employeePage.content);
                setShifts(weekShifts);
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="app">
            <header className="topbar">
                <span className="brand">ShiftBoard</span>
                <span className="title">Schedule</span>
            </header>

            <div className="toolbar">
                <span className="week-label">{formatWeekRange(weekStart)}</span>
            </div>

            <main className="content">
                {loading && <p className="message">Loading employees..</p>}
                {error && <p className="message">{error}</p>}

                {!loading && !error && <ScheduleGrid employees={employees} shifts={shifts} days={days} onShiftClick={setSelectedShiftId}/>}
            </main>

            {selectedShift && (
                <ShiftPanel
                    shift={selectedShift}
                    employee={selectedEmployee}
                    onClose={() => setSelectedShiftId(null)} 
                />
            )}
        </div>
    );
}