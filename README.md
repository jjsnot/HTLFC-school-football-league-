# Scoro — School Football Tournament App (Live Scores + Friendly Bets)

Scoro is a full-stack web app built for a school football tournament.  
I designed and implemented the product end-to-end: **real-time live scores**, **friendly no-money betting**, and an **admin workflow** for match & team management.

## Impact (1-day event)
- **132 users**
- **20 matches tracked**
- **671 bets placed**

---

## 🔗 Link
- **Website:** https://scoro.shov.studio/login

---

## 🖼️ Screenshots

### Home / Live Matches
![Home / Live Matches](https://github.com/user-attachments/assets/fca65200-e515-4a96-a3d1-c283d7beb462)

### Betting & Leaderboard
![Betting & Leaderboard](https://github.com/user-attachments/assets/57b0ce9b-777e-4cbf-9169-d46b9ee26372)
![Betting & Leaderboard](https://github.com/user-attachments/assets/fd685d45-0abc-4737-8b9d-824c649e475a)

### Admin Panel
![Admin Panel](https://github.com/user-attachments/assets/871d89ef-7e8c-4e27-91e7-53c7c3dc3ce9)
<img width="1470" height="919" alt="Admin Panel" src="https://github.com/user-attachments/assets/66b3462e-97ed-46b1-ba44-947ff8a49269" />

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/26263446-065f-4c11-909a-4f8d2fab5e58)

### Email Code
![Email Code](https://github.com/user-attachments/assets/197e745c-22f2-47fd-af96-c985f212bb20)

---

## ✨ Key Features
- **Live score updates** via **Socket.IO** (real-time UI updates without page refresh)
- **Authentication** with email verification code (OTP)
- **Admin panel** for managing teams, matches, and match states
- **Friendly betting system (no-money)** with balances + leaderboard-style experience

---

## 🧱 Tech Stack

### Frontend
- **Angular** + Angular Material + Bootstrap  
- **socket.io-client** for realtime updates

### Backend
- **Express.js**
- **Socket.IO**
- **JWT authentication**
- Email OTP flow (verification code)

### Database
- **SQLite**
- **Prisma ORM**

---

## 🗂️ Project Structure

```text
.
├── backend/                  # Express + Prisma + Socket.IO server
│   ├── prisma/               # Prisma schema/migrations
│   ├── routes/               # REST endpoints
│   ├── middleware/           # auth/guards
│   ├── index.js              # API entry + Socket.IO
│   └── db.js                 # Prisma client + SQLite adapter
└── frontend/                 # Angular app
```

---

## ✅ Getting Started (Local Development)

### 1) Clone

```bash
git clone https://github.com/jjsnot/HTLFC-school-football-league-.git
cd HTLFC-school-football-league-
```

### 2) Backend setup

```bash
cd backend
npm install

npx prisma generate
npx prisma migrate dev

npm run start
# or:
node index.js
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm start
```

---

## ⚙️ Environment Variables

Create a `.env` file (typically in `backend/`) and set:

```env
# Database (SQLite)
DATABASE_URL="file:./dev.db"

# Auth / Security
JWT_SECRET="change_me"
JWT_EXPIRES_IN="24h"

# Email OTP / verification
OTP_SECRET="change_me_too"
EMAIL_TOKEN="YOUR_EMAIL_PROVIDER_TOKEN"

# Admin credentials (if used by admin routes)
USERNAME="admin"
PASSWORD="strong_password_here"
```

> Note: If your code expects different variable names (e.g., `email_TOKEN`), keep the exact casing/key used in the backend.
