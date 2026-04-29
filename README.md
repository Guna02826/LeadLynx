# LeadLynx: Premium CRM & Outreach Platform

LeadLynx is a high-performance, full-stack lead and campaign management application. It's designed to help businesses organize their outreach efforts with a modern, intuitive interface and a robust backend.

## 🚀 Key Features

- **Dynamic Dashboard**: Real-time visualization of outreach performance and lead statistics.
- **Smart Lead Management**: Centralized database for capturing and managing leads with instant search and filtering.
- **Personalized Campaigns**: Launch personalized email campaigns using dynamic placeholders like `{name}` and `{company}`.
- **Premium UX/UI**: Built with a custom design system, glassmorphism effects, and smooth page transitions using Framer Motion.
- **Secure Foundation**: JWT-based authentication, helmet-secured HTTP headers, and structured backend validation.

## 🛠 Tech Stack

### Frontend
- **React (Vite)**: Modern, high-performance UI framework.
- **Framer Motion**: Smooth, cinematic animations and transitions.
- **Lucide React**: Premium, consistent iconography.
- **CSS Modules**: Scoped, maintainable styling with a centralized design system.
- **Axios**: Interceptor-based API client for global auth and error handling.

### Backend
- **Node.js & Express**: Scalable, asynchronous server architecture.
- **MongoDB & Mongoose**: Flexible document-based data modeling.
- **Express Validator**: Structured request validation for all API endpoints.
- **SendGrid**: Reliable email delivery integration.
- **JWT**: Stateless session management.

## 📂 Project Structure

```text
├── backend/
│   ├── config/         # Database configuration
│   ├── controller/     # Business logic & request handlers
│   ├── middleware/     # Auth, Error, and Validation middlewares
│   ├── models/         # Mongoose schema definitions
│   ├── routes/         # REST API endpoint definitions
│   ├── utils/          # Helper utilities (Email, JWT)
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components & Global Layout
    │   ├── pages/      # View components with modular CSS
    │   ├── api.js      # Global Axios instance
    │   └── index.css   # Centralized Design System
    └── main.jsx        # App entry point
```

## ⚡ Quick Start

### 1. Backend Setup
```powershell
cd backend
npm install
# Configure .env (see Environment Variables)
npm run dev
```

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create `.env` files in both directories:

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_api_key
EMAIL_USER=verified_sender@example.com
```

**Frontend (`frontend/.env`):**
```env
VITE_BASE_URL=http://localhost:5000/api
```

---

## 📈 Engineering Highlights

- **Aesthetic Excellence**: Implemented a comprehensive design system with HSL-based color tokens, ensuring visual consistency across all components.
- **Robustness**: Replaced manual checks with `express-validator` to ensure data integrity and provide clear API feedback.
- **Performance**: Leveraged Vite's lightning-fast bundling and React's efficient state management to ensure a near-instant user experience.
- **UX-First Design**: Implemented loading skeletons, empty states, and descriptive toast notifications to keep users informed.

---
*Developed as a premium showcase project.*
