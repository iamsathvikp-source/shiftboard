import { Employee } from "../types";
import { formatDayHeader } from "../utils/week";
import { EmployeeRow } from "./EmployeeRow";

interface Props {
    employees: Employee[];
    days: Date[];
}

export function ScheduleGrid({employees, days}: Props) {
    return (
        <div className="grid">
            <div className="row header">
                <div className="cell">Name</div>
                {days.map((day) => (
                <div className="cell" key={day.toISOString()}>{formatDayHeader(day)}</div>
                ))}
            </div>

            {employees.map((emp) => (
                <EmployeeRow key={emp.id} employee={emp} days={days} />
            ))}
        </div>
    );
}