# Printing House Management System

Full-stack multi-tenant web application for managing printing house operations.  
Built with React + TypeScript (Frontend) and Spring Boot + Java (Backend).

---

## Contents

- Tech Stack
- Project Structure
- Features
- Backend Overview
- Frontend Overview
- Install Instructions
- Future Tasks

---

## Tech Stack

### Backend
- Java 17 + Spring Boot 3.1.0
- MongoDB, Redis, RabbitMQ
- Docker Compose
- REST APIs
- Postman Mock Server
- Async Email/SMS Notifications

### Frontend
- React + TypeScript
- Redux Toolkit
- Axios + Interceptors
- Socket.io (for real-time updates)
- Formik + Yup (validations)
- Jest (unit testing)
- Google Analytics integration
- Modular CSS with makeStyles

---

## Project Structure

```
/backend
  /order-manager
  /payment-service
/frontend
  /src
    /components
    /pages
    /redux
    /api
    /utils
```

---

## Features

- Multi-Tenant Support
- Product & Catalog Management
- Order Lifecycle Tracking (New → Approved → Packing → Delivered)
- Analytics Dashboard:
  - Top employees
  - Best-selling products
  - Delivered vs Cancelled orders
- Role-based user management (Admin, Employee, Customer)
- Real-time notifications for new orders
- Login & Signup with secure token
- Interactive email/phone integration

---

## Backend Overview

- Two microservices:
  - Order Manager – exposes APIs to frontend (products, orders, users)
  - Payment Processor – handles payments asynchronously via RabbitMQ
- Order flow via state machine logic
- Redis used for caching exchange rates
- Queue-based async architecture for scalability
- MongoDB schemas include:
  - Users, Roles, Orders, Products, Payments
- APIs return tokens with companyId, userId, roleId

---

## Frontend Overview

### Routes
- /login – Login + Signup Modal
- /dashboard – Graphs: Top employees, Products, Order stats
- /orders – Pending orders (Top priority & regular), Create/Edit
- /catalog – (Admin only) Manage products/categories
- /users – Manage customers & employees (based on role)

### Tech Highlights
- Axios Interceptors – Error handling, auth token injection
- Redux Middleware – Thunk + Google Analytics
- Socket.io – Real-time order updates
- Form validation – with Formik/Yup
- Lazy Loading – for performance
- Pagination + Filtering – on orders view

---

## Install Instructions

### Prerequisites

Install:

- Git: https://git-scm.com/downloads  
- Node.js: https://nodejs.org/en/download/  
- VSCode: https://code.visualstudio.com  
- GitHub Desktop: https://desktop.github.com/  
- Postman: https://www.postman.com/downloads/

Verify installation:

```
git --version
node -v
npm -v
```

### Frontend Setup

```
cd frontend
npm install
npm start
```

### Backend Setup

```
cd backend
docker-compose up -d
```

---

## Future Tasks

- [ ] Add Docker Compose config for Mongo, Redis, RabbitMQ
- [ ] Integrate ElasticSearch + Logback
- [ ] Finish currency exchange rate logic
- [ ] Add async email notification service
- [ ] Finalize socket.io implementation
- [ ] Global error handler modal
- [ ] Field-level validations for all forms

---

## Design Tokens (Palette)

```ts
const PALLETE = {
  BLUE: '#6794CF',
  YELLOW: '#FAE282',
  RED: '#EE696A',
  GREEN: '#7ED787',
  ORANGE: '#EB9F6E',
  WHITE: '#FFFFFF',
};
```

---

## UI Overview

- Modal-based Signup
- Respo
<img width="496" height="603" alt="image" src="https://github.com/user-attachments/assets/8b6d62cc-1ec2-47bb-984a-d61e0ab88635" />
<img width="1697" height="850" alt="image" src="https://github.com/user-attachments/assets/0e65ad19-90f5-4a73-a6a2-781fb944f372" />
<img width="1697" height="850" alt="image" src="https://github.com/user-attachments/assets/a187e813-e213-411a-8578-4420eebbef96" />
