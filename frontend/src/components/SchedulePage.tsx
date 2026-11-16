import { useEffect,  useState } from 'react';
import type { Employee, PageResponse } from '../types';
import { formatWeekRange, startOfWeek, weekDays } from '../utils/week';
import { ScheduleGrid } from './ScheduleGrid';


//we need days and employees to show on the page, for now.
export function SchedulePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const weekStart = startOfWeek(new Date());
    const days = weekDays(weekStart);

    useEffect(() => {
        fetch('/api/v1/employees?page=0&size=100')
        .then((res) => {
            if(!res.ok) throw new Error(`Couldn't load employees (HTTP ${res.status})`);
            return res.json() as Promise<PageResponse<Employee>>;
        })
        .then((data) => setEmployees(data.content))
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

                {!loading && !error && <ScheduleGrid employees={employees} days={days}/>}
            </main>
        </div>
    );
}