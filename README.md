
# SDE Intern Assignment (NestJS + TypeORM + PostgreSQL + JWT)

## Quick start (recommended using Docker)
1. Copy `.env.example` to `.env` and update if needed.
2. Start Postgres with docker-compose:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm run start:dev
   ```
5. Register and login using Postman:
   - POST /users to register
   - POST /auth/login to obtain JWT token
   - Use `Authorization: Bearer <token>` to call protected endpoints like GET /users

## Tests
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`
