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