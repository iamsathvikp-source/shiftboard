import { Employee, Shift } from "../types";
import { initials } from "../utils/names";
import { cellKey, formatShiftTime } from "../utils/shifts";
import { toIsoDate } from "../utils/week";

interface Props {
    employee: Employee;
    days: Date[];
    shiftsByCell: Map<string, Shift[]>;
    onShiftClick: (shiftId: number) => void;
}

export function EmployeeRow({employee, days, shiftsByCell, onShiftClick}: Props) {
    return (
        <div className="row">
            <div className="cell name-cell" title={`${employee.jobTitle} · ${employee.homeLocation}`}>
                <span className="avatar">{initials(employee.fullName)}</span>
                <span className="name">{employee.fullName}</span>
            </div>
            {days.map((day) => {
                const shifts = shiftsByCell.get(cellKey(employee.id, toIsoDate(day))) ?? [];

                return (
                    <div className="cell day-cell" key={day.toISOString()}>
                        {shifts.map((shift) => (
                            <button className="shift" key={shift.id} onClick={() => onShiftClick(shift.id)}>{formatShiftTime(shift)}</button>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}