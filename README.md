# 💳пш Payment Cards Manager – React + TypeScript App

**Card Manager** is a modern and responsive user interface for managing payment cards — view, add, filter, set as default, and delete cards. Built using **React**, **TypeScript**, and **shadcn/ui**, with data stored locally (mocked for demonstration).

🔗 **Live Demo**: _link_

---

## 📑 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Author](#author)

---

## 📖 Description

This application features a `/my-cards` page where users can:

- View their saved payment cards in a table format.
- Add a new card using a modal dialog with form validation.
- Filter existing cards by brand or last 4 digits.
- Mark any card as the default.
- Delete cards.

The app uses fully mocked data and does not persist to a backend. It’s intended as a UI prototype or a front-end tech demo.

---

## 🚀 Features

- 📋 Display user payment cards in a data table
- ➕ Add a new card using a form in a modal dialog
- 🗂 Filter cards by brand or last 4 digits
- 🌟 Set any card as the default
- 🗑️ Delete cards
- ⌛ Manage `loading` and `empty` UI states
- 🌙 Dark and light theme toggle
- 📱 Fully responsive design for all screen sizes
- ✅ Form validation with **React Hook Form** and **Zod**

---

## 🧪 Tech Stack

### Core

- **React + TypeScript**
- **Vite**
- **React Router**

### UI & Styling

- **shadcn/ui** (built on Radix UI)
- **Tailwind CSS**
- **clsx** + **class-variance-authority**
- **lucide-react**+**react-icons** (icons)

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
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

---

## 👤 Author

**Mariia Zh.** — Frontend Developer  
🔗 [GitHub Profile](https://github.com/MariiaZhk)

---
