# JobTrackr 📋

A full-stack job application tracking system built with the MERN stack and TypeScript. 
Stop losing track of where you applied — manage every application in one place.

> 🔗 Live Demo: [your-vercel-url]
> 💻 GitHub: https://github.com/itsmeeSanj/JobTrackr

---

## 🎯 Why I Built This

While job hunting in Canada, I was applying to 50+ companies
and had no way to track:
- Where I applied
- What stage each application was in
- Which resume version I sent
- When to follow up

So I built JobTrackr to solve my own problem.

---

## ✨ Features

- 📊 Dashboard with real-time application stats
- 📋 Applications table with search, filter and sort
- 🗂️ Kanban board — drag and drop between stages
- ➕ Add, edit and delete applications
- 🔒 Secure auth with JWT + HTTP-only cookies
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| Ant Design | Component library |
| Tailwind CSS | Utility styling |
| Recharts | Dashboard charts |
| @hello-pangea/dnd | Kanban drag and drop |
| React Router v6 | Client-side routing |
| Context API | Global auth state |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Nodemailer + Brevo | OTP emails |
| cookie-parser | HTTP-only cookies |

---

## 📁 Project Structure
JobTrackr/

├── client/

│   └── src/

│       ├── features/

│       │   ├── auth/

│       │   └── jobs/

│       ├── layouts/

│       ├── components/

│       ├── api/

│       ├── hooks/

│       ├── types/

│       └── router/

└── server/

├── controllers/

├── models/

├── routes/

├── middleware/

└── config/




---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Brevo account (free tier)

### 1. Clone the repo
```bash
git clone https://github.com/itsmeeSanj/JobTrackr.git
cd JobTrackr
```

### 2. Setup server
```bash
cd server
npm install
cp .env.example .env
npm run dev        # starts with nodemon on localhost:4000
```

### 3. Setup client
```bash
cd client
npm install
npm run dev        # starts on localhost:5173
```

---

## ⚙️ Environment Variables

Create `server/.env` using `.env.example`:

```env
MONGODB_URI=
JWT_SECRET=
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SMTP_USER=
SMTP_PASSWORD=
SENDER_EMAIL=
```
> ⚠️ Never commit your real `.env` — already in `.gitignore`

---

## 🔑 API Reference

### Auth Routes `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |
| POST | `/send-reset-otp` | Send OTP |
| POST | `/verify-reset-otp` | Verify OTP |
| POST | `/reset-password` | Reset password |

### Job Routes `/api/jobs`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all jobs |
| POST | `/` | Add new job |
| GET | `/:id` | Get single job |
| PUT | `/:id` | Update job |
| DELETE | `/:id` | Delete job |
| GET | `/stats` | Get dashboard stats |

---

## 🗺️ Roadmap

- [ ] Resume upload per application
- [ ] Follow-up email reminders
- [ ] Interview notes
- [ ] Chrome extension to add jobs from LinkedIn
- [ ] Export to CSV

---

## 👤 Author

**Sanjay Rawal**
- GitHub: [@itsmeeSanj](https://github.com/itsmeeSanj)
- LinkedIn: [https://www.linkedin.com/in/sanjay-rawal-311846184/]

---

## 📄 License
MIT
