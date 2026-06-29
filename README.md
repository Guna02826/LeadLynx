# LeadLynx: Premium CRM & Outreach Platform

## 🔗 [Live Demo](https://leadlynx.netlify.app/com)

LeadLynx is a high-performance, full-stack lead and campaign management application. It's designed to help businesses organize their outreach efforts with a modern, intuitive interface and a robust backend architecture.

## 🚀 Key Features

- **Dynamic Dashboard**: Real-time visualization of outreach performance and lead statistics.
- **Smart Lead Management**: Centralized database for capturing and managing leads with instant search and filtering.
- **Personalized Campaigns**: Launch personalized email campaigns using dynamic placeholders like `{name}` and `{company}`.
- **Premium UX/UI**: Built with a custom design system, glassmorphism effects, and smooth page transitions using Framer Motion.
- **Atomic UI System**: Highly modular component architecture for maximum reusability and consistency.

## 🏗️ Architecture & Design Decisions

This project was built with a focus on **clean code** and **scalable architecture**. Key decisions include:

### ⚛️ Frontend: Context API & Atomic Design
- **React Context API**: Used for authentication state management to ensure a single source of truth and eliminate "prop-drilling."
- **Atomic Component Structure**: UI elements are broken down into `common` atomic units (Buttons, Inputs, Badges), ensuring that a single change in the design system reflects globally.
- **Axios Interceptors**: Implemented global request/response handling to automatically manage JWT tokens and handle session expirations (401 errors).

### 🛠️ Backend: Standardized REST API
- **Standardized Responses**: Every API endpoint returns a consistent `{ success, data, message }` structure, making frontend integration predictable and robust.
- **Async Middleware**: Used a higher-order `asyncHandler` to eliminate repetitive `try-catch` blocks, keeping controllers clean and focused on business logic.
- **Security First**: Implemented `helmet` for secure headers, `express-validator` for data integrity, and `bcryptjs` for hashed password storage.

## 🛠 Tech Stack

### Frontend
- **React (Vite)**: Modern, high-performance UI framework.
- **Framer Motion**: Smooth, cinematic animations and transitions.
- **Lucide React**: Premium, consistent iconography.
- **CSS Modules**: Scoped, maintainable styling with a centralized design system.
- **Axios**: Interceptor-based API client.

### Backend
- **Node.js & Express**: Scalable, asynchronous server architecture.
- **MongoDB & Mongoose**: Flexible document-based data modeling.
- **Express Validator**: Structured request validation.
- **SendGrid**: Reliable email delivery integration.
- **JWT**: Stateless session management with custom `protect` middleware.

## 📂 Project Structure

```text
├── backend/
│   ├── controller/     # JSDoc documented business logic
│   ├── middleware/     # Auth, Error, Async, and Validation
│   ├── models/         # Mongoose schema definitions
│   ├── routes/         # REST API endpoint definitions
│   ├── utils/          # Standardized API Response & Email helpers
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/ # Atomic UI components (Button, Input, Badge)
    │   │   └── ...     # Specialized UI components (StatCard, LeadCard)
    │   ├── context/    # Global State (AuthContext)
    │   ├── pages/      # View components with modular CSS
    │   └── api.js      # Global Axios instance
    └── main.jsx        # App entry point
```

## ⚡ Quick Start

### 1. Backend Setup
```powershell
cd backend
npm install
# Copy .env.example to .env and fill in your keys
npm run dev
```

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Refer to [.env.example](.env.example) in the root directory for a full list of required variables.

---

## 📈 Engineering Highlights

- **Aesthetic Excellence**: Implemented a comprehensive design system with HSL-based color tokens.
- **Developer Experience (DX)**: Full JSDoc documentation for all API controllers and helper utilities.
- **Robustness**: Global error handling middleware ensures the server never crashes on unexpected inputs.
- **UX-First Design**: Implemented loading states, empty states, and descriptive toast notifications.

---
*Developed with a focus on professional software engineering standards.*
