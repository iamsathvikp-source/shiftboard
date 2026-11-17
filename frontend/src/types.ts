export interface Employee {
    id: number;
    employeeNumber: string;
    fullName: string;
    jobTitle: string;
    homeLocation: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ShiftSegment {
  type: string;
  startDatetime: string;
  endDatetime: string;
  paid: boolean;
}

export interface Shift {
  id: number;
  employeeId: number;
  startDatetime: string;
  endDatetime: string;
  segments: ShiftSegment[];
}