import { Employee, Shift } from "../types";
import { initials } from "../utils/names";
import { formatDuration, formatShiftTime, formatTime } from "../utils/shifts";

interface Props {
    shift: Shift;
    employee: Employee | undefined;
    onClose: () => void;
}

const label = (code: string) => code.charAt(0) + code.slice(1).toLowerCase();

export function ShiftPanel({shift, employee, onClose}: Props) {
    return (
        <aside className="shift-panel">
            <div className="panel-header">
                <h2>Shift</h2>
                <button className="icon-close" onClick={onClose} aria-label="Close">x</button>
            </div>

            <div className="panel-body">
                <p className="panel-summary">
                    {formatShiftTime(shift)} [{formatDuration(shift.startDatetime, shift.endDatetime)}]
                </p>

                <div className="panel-employee">
                    <span className="avatar">{employee ? initials(employee.fullName) : '?'}</span>
                    <div>
                        <div className="panel-label">Employee</div>
                        <div>{employee?.fullName ?? 'Unknown employee'}</div>
                    </div>
                </div>

                <h3 className="panel-section">Segments</h3>
                {shift.segments.map((segment) => (
                    <div className="segment" key={segment.startDatetime}>
                        <div className="segment-title">
                            {label(segment.type)}
                            <span className="segment-duration">
                                [{formatDuration(segment.startDatetime, segment.endDatetime)}]
                            </span>
                        </div>
                        <div className="segment-times">
                            <div>
                                <div className="panel-label">Start Time</div>
                                <div className="time-box">{formatTime(segment.startDatetime)}</div>
                            </div>
                            <div>
                                <div className="panel-label">End Time</div>
                                <div className="time-box">{formatTime(segment.endDatetime)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="panel-footer">
                <button className="btn" onClick={onClose}>Close</button>
            </div>
        </aside>
    );
}