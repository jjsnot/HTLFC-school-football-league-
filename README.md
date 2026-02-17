# Scoro — School Football Tournament App (Live Scores + Friendly Bets)

Scoro is a full-stack web app built for a school football tournament.  
I designed and implemented the product end-to-end: **real-time live scores**, **friendly no-money betting**, and an **admin workflow** for match & team management.

**Impact (1-day event):**
- **132 users**
- **20 matches tracked**
- **671 bets placed**

---

## 🔗 Links
- **GitHub:** https://github.com/jjsnot/HTLFC-school-football-league-
- **Website:** https://scoro.shov.studio/home

---




### Home / Live Matches
![telegram-cloud-photo-size-2-5235664691625923214-y](https://github.com/user-attachments/assets/fca65200-e515-4a96-a3d1-c283d7beb462)


### Betting & Leaderboard
![telegram-cloud-photo-size-2-5235664691625923219-y](https://github.com/user-attachments/assets/57b0ce9b-777e-4cbf-9169-d46b9ee26372)
![telegram-cloud-photo-size-2-5235664691625923249-y](https://github.com/user-attachments/assets/fd685d45-0abc-4737-8b9d-824c649e475a)


### Admin Panel
![telegram-cloud-photo-size-2-5235880728480912218-y](https://github.com/user-attachments/assets/871d89ef-7e8c-4e27-91e7-53c7c3dc3ce9)
<img width="1470" height="919" alt="image" src="https://github.com/user-attachments/assets/66b3462e-97ed-46b1-ba44-947ff8a49269" />



### Mobile View
![Mobile View](./docs/screenshots/mobile.png)

---

## Key Features
- **Live score updates** via **Socket.IO** (real-time UI updates without page refresh)
- **Authentication** with email verification code (OTP)
- **Admin panel** for managing teams, matches, and match states
- **Friendly betting system** (no-money) with balances + leaderboard-style experience

---

## Tech Stack
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
