# 📚 EduLens - Exam Management System

EduLens is a simplified examination system where teachers can manage a question bank, and the system automatically generates shuffled exam versions for students. It tracks performance, timing, and supports exporting results to Excel.

---

## 🚀 Live Demo

- Frontend: https://edulens-frontend.vercel.app/
- Backend: https://edulens-eight.vercel.app/

---

## 📁 Repository Structure

This repository contains two main folders:


frontend/ → React application (Student & Teacher UI)
backend/ → Node.js + Express API server


---

## 🧑‍🏫 Demo Accounts

For testing purposes:

  Teacher Account 
  Email: teacher@test.com  \
  Password: 123456 \
  Student Account (Optional for testing)
  Email: student@test.com  
  Password: 123456

You can use the student account to test the full exam flow without creating a new account via signup.
---

## ⚙️ Tech Stack

### Frontend
- React.js
- React Router DOM
- TanStack React Query
- Zustand (State Management)
- Tailwind CSS
- Formik + Yup
- Fetch API
- SweetAlert2
- React Hot Toast
- Lucide React / React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Redis (Upstash)
- JWT Authentication
- bcrypt
- ExcelJS
- express-validator
- cookie-parser
- cors
- dotenv

---

## 🧠 Features

### 👨‍🏫 Teacher Features
- Add / Edit / Delete MCQ Questions
- Upload images for questions (Cloudinary)
- Create exams 
- Generate 4 shuffled exam forms
- Export student results to Excel

### 👨‍🎓 Student Features
- Random assignment of exam form
- Timed exam session
- Automatic solving time tracking
- Instant score feedback after submission

---
## ⏱️ Exam Rules
 - Each exam has a fixed duration of 2 hours.
- The timer starts when the student begins the exam.
- If the time limit is exceeded, the student can still access the exam and continue solving.
- However, if the student submits the exam after the allowed time has ended, the score will automatically be 0.
---




## 🔐 Authentication & Roles

- Default role for all users: `student`
- Teacher is assigned via a predefined account:


teacher@test.com


> This is a simplified role system for demo purposes.

---

## ⚡ Environment Variables

### Backend `.env`


- MONGODB_CONNECTION_STRING=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- FRONTEND_URL=https://edulens-frontend.vercel.app
- UPSTASH_REDIS_REST_URL=your_upstash_url
- UPSTASH_REDIS_REST_TOKEN=your_upstash_token


---

### Frontend `.env`


- VITE_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
- VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
- VITE_BACKEND_URL=https://edulens-eight.vercel.app/


---

## 🛠️ Installation & Setup

### 1️⃣ Clone repository
```bash
git clone https://github.com/mohamedtarek45/edulens.git
cd edulens
2️⃣ Backend setup
cd backend
npm install
npm run dev
3️⃣ Frontend setup
cd frontend
npm install
npm run dev
```

## 📊 Database & Performance
- MongoDB for persistent storage
- Redis (Upstash) for:
  - Active exam sessions
  - Timer tracking
  - Performance optimization
## 📤 Export Feature

Teachers can export student results as Excel files using ExcelJS for offline grading and analysis.

## 👨‍💻 Author

Mohamed Tarek
Full Stack Developer (MERN Stack)
