<h1 align="center">🧩 Mini CRM</h1>

<p align="center">
  A simple and modular CRM application — built for learning and self-improvement!
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/xHolland0/Mini_CRM?color=green&style=plastic" />
  <img src="https://img.shields.io/github/languages/top/xHolland0/Mini_CRM?style=plastic " />
  <img src="https://img.shields.io/badge/status-Development-yellow?style=plastic " />
</p>

---

## ⚙️ Tech Stack

<p align="center">
    <img src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff" />
    <img src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&logoColor=white" />
    <img src="https://img.shields.io/badge/JSON-black?style=flat&logo=json&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=000" />
    <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=fff" />
    <br>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white" />
  <br>
    <img src="https://img.shields.io/badge/NuGet-004880?logo=nuget&logoColor=fff](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff" />
</p>

---

## ✨ Features

- 👤 Admin and Employee roles
- 📦 Inventory (Stock) management
- 📝 Internal note system
- 💰 Income & Expense (Finance) tracking
- ✅ Task manager
- 📇 Contacts directory

---

## 🚀 How to Clone & Run

### 1. Clone the Repository

```bash
git clone https://github.com/xHolland0/Mini_CRM.git
cd Mini_CRM
```

### Run The API

```bash
cd API
dotnet ef database update
dotnet run
```

### Run the React Frontend

```bash
cd Client
npm install
npm start
```

### Project Structure

```bash
Mini_CRM/
├── API/              # ASP.NET Core Web API
├── Client/           # React frontend (coming soon)
├── Mini_CRM.sln      # Solution file
└── README.md         # This file
```

## ⚠️ Risk Assessment Matrix

| Risk Description                           | Likelihood | Impact | Risk Level  | Notes                                    |
| ------------------------------------------ | ---------- | ------ | ----------- | ---------------------------------------- |
| Database corruption or loss                | Medium     | High   | 🔴 Critical | Preventable via migrations and backups   |
| Auth0 downtime or disconnection            | Low        | High   | 🔴 Critical | Consider fallbacks or service monitoring |
| Missing authentication on API endpoints    | Medium     | High   | 🟠 High     | Ensure JWT & Role-based auth are active  |
| Missing frontend form validation           | High       | Medium | 🟡 Medium   | Use Yup or Validator.js with MUI         |
| API-Frontend version mismatch              | Medium     | Medium | 🟡 Medium   | Keep schema aligned using Swagger        |
| Lack of test coverage                      | High       | Medium | 🟡 Medium   | Add unit and integration tests           |
| Technical debt (growing unstructured code) | High       | Low    | 🟢 Low      | Regular code reviews and refactors       |



## 🧠 Database Design

### ER Diagram Summary
| Table           | Description                                 |
| --------------- | ------------------------------------------- |
| `Tenant`        | Represents a business or company            |
| `User`          | Auth0 user info, role, name, position, etc. |
| `Note`          | Notes written by users                      |
| `TaskItem`      | Tasks assigned to users                     |
| `InventoryItem` | Items with stock quantity and images        |
| `FinanceRecord` | Financial income/expense records            |
| `Contact`       | Directory of external or internal contacts  |


## 👨‍💻 Developer
This project is built by Yusuf Okan Çevik for educational and personal development purposes.
Feedback, suggestions, and contributions are welcome! 🙌


