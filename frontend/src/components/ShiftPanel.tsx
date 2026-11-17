import { useEffect } from "react";
import { Employee, Shift } from "../types";
import { initials } from "../utils/names";
import { formatDuration, formatShiftDate, formatShiftTime, formatTime } from "../utils/shifts";

interface Props {
    shift: Shift;
    employee: Employee | undefined;
    onClose: () => void;
}

const label = (code: string) => code.charAt(0) + code.slice(1).toLowerCase();
const orDash = (value: string | null | undefined) => (value && value.trim() ? value : '–');

export function ShiftPanel({shift, employee, onClose}: Props) {

    useEffect(() => {
        const onKeyDown = (e:KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <aside className="shift-panel">
            <div className="panel-header">
                <h2>Shift</h2>
                <button className="icon-close" onClick={onClose} aria-label="Close">x</button>
            </div>

            <div className="panel-body">
                <div className="panel-headline">
                    <div className="headline-date">{formatShiftDate(shift)}</div>
                    <div className="headline-time">
                        {formatShiftTime(shift)} [{formatDuration(shift.startDatetime, shift.endDatetime)}]
                    </div>
                </div>

                <div className="panel-employee">
                    <span className="avatar">{employee ? initials(employee.fullName) : '–'}</span>
                    <div>
                        <div className="panel-label">Employee</div>
                        <div>{orDash(employee?.fullName)}</div>
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