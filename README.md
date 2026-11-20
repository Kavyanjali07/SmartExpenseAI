# SmartExpenseAI

A full-stack personal finance application for tracking expenses, planning budgets, reviewing spending patterns, and exploring AI-assisted financial insights.

> **Project status:** Personal engineering project. Review the implementation and test coverage before using it with real financial data. This project is not financial advice.

## Overview

SmartExpenseAI combines a Java/Spring backend with a Next.js frontend.

- **Backend:** Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA, Spring Security, Bean Validation
- **Frontend:** Next.js 16, React 19, TypeScript
- **Data:** MySQL connector for configured database deployments; H2 in-memory database in the development profile
- **Supporting services:** Redis integration, JWT-based authentication, OpenCSV
- **AI integration:** Configurable OpenAI-compatible chat-completions endpoint

## Features

The project is designed around these workflows:

- User registration and authentication
- Expense creation, viewing, updating, and deletion
- Budget planning and expense categorisation
- Spending summaries, charts, and trend analysis
- CSV import/export workflows
- AI-assisted spending insights and recommendations

Feature availability can depend on the current implementation and configuration. See the source code for the authoritative behaviour.

## Repository structure

```text
SmartExpenseAI/
├── backend/     # Java 17 and Spring Boot REST API
└── frontend/    # Next.js and React application
```

## Requirements

- Java 17
- Node.js 20.9 or newer
- npm
- Redis, if the running backend configuration or enabled features require it
- MySQL, if you choose a MySQL deployment instead of the development H2 profile

## Run locally

### 1. Configure the backend

The backend uses environment variables for secrets and external service configuration. Do not commit real values to the repository.

At minimum, provide a strong JWT signing secret:

```bash
export JWT_SECRET="$(openssl rand -base64 48)"
```

Optional AI configuration:

```bash
export OPENAI_API_KEY="your-api-key"
export OPENAI_MODEL="gpt-4o-mini"
```

The application configuration also supports:

| Variable | Purpose | Default |
|---|---|---|
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRATION` | Token lifetime in milliseconds | `3600000` |
| `OPENAI_API_KEY` | AI provider API key | Empty |
| `OPENAI_MODEL` | AI model name | `gpt-4o-mini` |
| `OPENAI_API_URL` | Chat-completions endpoint | OpenAI endpoint |
| `REDIS_HOST` | Redis hostname | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_TIMEOUT` | Redis connection timeout | `2000ms` |

Start the backend:

```bash
cd backend
./mvnw spring-boot:run
```

If the Maven wrapper is unavailable, install Maven and use:

```bash
mvn spring-boot:run
```

The configured backend port is `8080`. The default development profile uses an in-memory H2 database; its data is not durable across application restarts.

### 2. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Configure the frontend API endpoint using the environment variable expected by the frontend API client in your local setup. Do not assume a production API URL.

## Useful commands

### Backend

```bash
cd backend
./mvnw test
./mvnw clean package
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

## Security notes

- Keep JWT signing keys, AI provider keys, database credentials, and other secrets outside source control.
- Use a unique, high-entropy JWT secret for each environment.
- Rotate any credential that has ever been committed to a public repository. Removing it from the latest file does not remove it from Git history.
- Do not use real personal financial data when testing an unreviewed development build.
- Review authentication, authorization, validation, CORS, and error handling before deployment.
- Use HTTPS and secure production database settings in any deployed environment.

## Current limitations and next steps

Areas worth strengthening as the project evolves:

- Automated backend and frontend test coverage
- Reproducible local setup and environment examples
- API documentation and representative request/response examples
- Database migration and production deployment guidance
- Security review of authentication, authorization, and secret management
- Screenshots or a short demo of the actual running application

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make a focused change and add or update tests.
4. Run the relevant checks.
5. Open a pull request describing the change.

## Author

**Kavyanjali**

- [GitHub](https://github.com/Kavyanjali07)
- [LinkedIn](https://www.linkedin.com/in/kavyanjali07)
