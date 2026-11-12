# ShiftBoard

A workforce scheduling app: managers see their employees in a weekly schedule grid
(employee rows × Sunday–Saturday columns). Learning/portfolio project.

```
shiftboard/
├── backend/    Spring Boot 3.3, Java 17, Spring Data JPA, Flyway, PostgreSQL
└── frontend/   React 18 + TypeScript + Vite
```

## Run it locally

**1. Database** (PostgreSQL on localhost:5432)

```sql
CREATE USER shiftboard WITH PASSWORD 'shiftboard';
CREATE DATABASE shiftboard OWNER shiftboard;
```

(Or `docker compose up -d` to start one in Docker instead.)

**2. Backend:** set the database password as an environment variable, then start the app.
Flyway creates the schema on startup.

| Variable | Required | Default |
|---|---|---|
| `DB_PASSWORD` | yes | (none: the app won't start without it) |
| `DB_URL` | no | `jdbc:postgresql://localhost:5432/shiftboard` |
| `DB_USERNAME` | no | `shiftboard` |

- IntelliJ: Run → Edit Configurations → ShiftBoardApplication → Environment variables → `DB_PASSWORD=shiftboard`
- Terminal: `cd backend && DB_PASSWORD=shiftboard mvn spring-boot:run`

**3. Demo data (once):** 100 fake employees.

```bash
cd backend
psql -h localhost -U shiftboard -d shiftboard -f scripts/seed_demo_employees.sql
```

**4. Frontend**

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## API

`GET /api/v1/employees?page=0&size=50`: active employees, sorted by last name, first name, id.

```json
{
  "content": [{ "id": 18, "employeeNumber": "E1018", "fullName": "Abara, Hana",
                "jobTitle": "Registered Nurse", "homeLocation": "Emergency" }],
  "page": 0, "size": 50, "totalElements": 95, "totalPages": 2
}
```

## How a request flows

```
Browser (5173) --GET /api/v1/employees--> Vite proxy (/api) --> EmployeeController
  --> EmployeeService (clamps page/size, fixed sort) --> EmployeeRepository
  --> Postgres: WHERE active ORDER BY last_name, first_name, id OFFSET/FETCH
  <-- PageResponse<EmployeeDto> as JSON
```

## Design decisions
- **DTO, not entity, in the API.** The entity mirrors the table; `EmployeeDto` is the API contract.
- **Own `PageResponse`** instead of Spring's `Page`, so the JSON shape stays stable.
- **Page size capped at 100.** Lists of employees grow; no endpoint returns everything at once.
- **Sort ends with `id`** so employees with the same name never swap between pages.
- **Flyway owns the schema** (`ddl-auto: validate`). Demo data is a manual script in `backend/scripts/`, never a migration, so it can't reach production.
- **Partial index** `(last_name, first_name, id) WHERE active` matches the schedule query exactly.
  `backend/scripts/explain_index_demo.sql` shows the difference on 50,000 rows (in a rolled-back transaction).

## Next
Backend tests, then shifts + `GET /api/v1/schedule?weekStart=...` to fill the grid.
