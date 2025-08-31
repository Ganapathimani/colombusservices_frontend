# 🚀 Columbus Logistics Web Application

A modern logistics management platform built with **React**, **TypeScript**, **Redux Toolkit (RTK Query)**, and **Material-UI (MUI)**.
The application provides seamless logistics workflows, authentication, and real-time integration.

---

## 🛠️ Tech Stack

* **React** – UI library for building interactive interfaces.
* **TypeScript** – Strict typing for better maintainability and scalability.
* **Redux Toolkit + RTK Query** – State management and API caching.
* **Material UI (MUI)** – Modern UI components with theming support.
* **FontAwesome Icons** – For enhanced UI/UX.
* **Vite / CRA (whichever you’re using)** – Project bundler and dev server.
* **Node.js & npm** – Package manager and runtime.

---

## 📂 Project Structure

```
src/
│── api/              # RTK Query API definitions
│── components/       # Reusable UI components (MUI + custom)
│── hooks/            # Custom React hooks
│── pages/            # Page-level components
│── store/            # Redux store configuration
│── types/            # TypeScript type definitions
│── utils/            # Utility functions (e.g., token expiry handling)
│── App.tsx           # Main App component
│── main.tsx          # React entry point
```

---

## ⚡ Features

* ✅ User Authentication (Login/Signup)
* ✅ LocalStorage with **24h Token Expiry**
* ✅ Logistics Dashboard UI (MUI based)
* ✅ API Integration via **RTK Query**
* ✅ Responsive design with MUI theming (Green & White Theme)
* ✅ FontAwesome Icon support

---

## 🔧 Setup Instructions

### 1️⃣ Prerequisites

Make sure you have the following installed:

* **Node.js** (>= 16.x)
* **npm** (>= 8.x) or **yarn**

Verify installation:

```bash
node -v
npm -v
```

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-org/columbus-logistics-app.git
cd columbus-logistics-app
```

---

### 3️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 4️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

---

### 5️⃣ Run the Project

```bash
npm run dev
# or
yarn dev
```

The app will be available at: **[http://localhost:5173](http://localhost:5173)**

---

### 6️⃣ Build for Production

```bash
npm run build
# or
yarn build
```

Serve the production build:

```bash
npm run preview
```

---

## 📘 Token Expiry Handling

We use a **localStorage wrapper** that automatically expires tokens after **24 hours**:

```ts
// utils/storage.ts
export const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
```

---

## 🤝 Contribution Guidelines

1. Fork the repo
2. Create a new branch (`feature/xyz`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch and create a PR

---

## 📜 License

This project is licensed under the **MIT License**.
