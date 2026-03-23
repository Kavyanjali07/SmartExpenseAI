# SmartExpenseAI

SmartExpenseAI is a full-stack personal finance manager with AI-powered spending insights and budget tracking.

## 🚀 Overview

- Spring Boot backend with REST API and JWT authentication
- Next.js frontend with responsive dashboard and chart visualizations
- AI assistant for intelligent expense recommendations and analysis
- CSV import/export, budgets, insights, and financial health scoring

## 🧩 Features

- User registration and authentication
- Expense CRUD and budget planner
- Categorization with chart visualizations
- AI insights and anomaly detection (GPT-like assistant)
- Financial health and income/expense trend analysis

## 📁 Repo Layout

- `backend/`: Java Spring Boot API project
- `frontend/`: Next.js UI project

## 🛠️ Backend Quick Start

1. `cd backend`
2. `./mvnw clean package` (or `mvn clean package`)
3. `java -jar target/smart-expense-tracker-1.0.0.jar`

Default config from `backend/src/main/resources/application.yml`.

## 🖥️ Frontend Quick Start

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Open `http://localhost:3000`.

## 📦 Build Targets

- Backend: `backend/target`
- Frontend: `frontend/.next`

## 🧪 Testing

- Backend: `cd backend && ./mvnw test`
- Frontend: `cd frontend && npm test` (if tests configured)

## ℹ️ Notes

- Update `.env` or config for API URLs and credentials.
- Enable CORS in backend via `config/CorsConfig.java`.

---

## 🤝 Contribution

1. Fork
2. Create feature branch
3. Add tests
4. PR to `main`

---

## 📬 Contact

Kavyanjali - smart expense AI project lead.
