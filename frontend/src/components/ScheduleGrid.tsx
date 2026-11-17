import { Employee, Shift } from "../types";
import { groupByCell } from "../utils/shifts";
import { formatDayHeader } from "../utils/week";
import { EmployeeRow } from "./EmployeeRow";

interface Props {
    employees: Employee[];
    shifts: Shift[];
    days: Date[];
    onShiftClick: (shiftId: number) => void;
}

export function ScheduleGrid({employees, shifts, days, onShiftClick}: Props) {
    const shiftsByCell = groupByCell(shifts);

    return (
        <div className="grid">
            <div className="row header">
                <div className="cell">Name</div>
                {days.map((day) => (
                <div className="cell" key={day.toISOString()}>{formatDayHeader(day)}</div>
                ))}
            </div>

            {employees.map((emp) => (
                <EmployeeRow key={emp.id} employee={emp} days={days} shiftsByCell={shiftsByCell} onShiftClick={onShiftClick}/>
            ))}
        </div>
    );
}