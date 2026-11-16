import { Employee } from "../types";
import { initials } from "../utils/names";

interface Props {
    employee: Employee;
    days: Date[];
}

export function EmployeeRow({employee, days}: Props) {
    return (
        <div className="row">
            <div className="cell name-cell" title={`${employee.jobTitle} · ${employee.homeLocation}`}>
                <span className="avatar">{initials(employee.fullName)}</span>
                <span className="name">Someone Else</span>
            </div>
            {days.map((day) => (
                <div className="cell" key={day.toISOString()}></div>
            ))}
        </div>
    );
}