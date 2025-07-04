# 💳 Payment Cards Manager App

**Payment Cards Manager** is a frontend app for managing payment cards: view, add, filter, set as default, and delete. Built using **Vite**, **React**, **TypeScript**, and **shadcn/ui**.

🔗 **Live Demo:** [https://paycards-manager.vercel.app/](https://paycards-manager.vercel.app/)

## 📑 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Author](#author)

## 📖 Description

This application provides an interface for managing payment cards. On the `/my-cards` page, users can:

- View their saved payment cards in a table format.
- Add new cards using a modal form with validation.
- Filter cards by brand or last 4 digits.
- Set any card as the default.
- Delete cards.

The app initializes with mocked card data and persists all cards (both the initial mocked ones and any new cards added by the user) in localStorage. The app does not connect to a backend; it is intended as a frontend-only prototype or tech demo.

## 🚀 Features

- 📋 Display user payment cards in a data table
- ➕ Add a new card via modal form
- 🗂 Filter cards by brand or last 4 digits
- 🌟 Mark a card as the default
- 🗑️ Delete existing cards
- ⌛ Handle `loading` and `empty` UI states
- 🌙 Toggle between dark and light themes
- 📱 Responsive design for all screen sizes
- ✅ Form validation using **React Hook Form** and **Zod**

## 🧪 Tech Stack

### Core

- **React**
- **TypeScript**
- **Vite**
- **React Router**

### UI & Styling

- **shadcn/ui** (based on Radix UI)
- **Tailwind CSS**
- **clsx** & **class-variance-authority**
- **lucide-react** & **react-icons**

### Forms & Validation

- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

## ▶️ Getting Started

To run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MariiaZhk/paycards-manager.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd paycards-manager
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## 👤 Author

**Mariia Zh.** — Frontend Developer  
🔗 [GitHub Profile](https://github.com/MariiaZhk)
