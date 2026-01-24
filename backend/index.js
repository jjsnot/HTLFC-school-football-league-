import "dotenv/config";
import express from "express";
import cors from "cors";
import teams from "./routes/teams.js";
import match from "./routes/match.js";
import admin from "./routes/admin.js";
import bets from "./routes/bets.js";


const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/admin" , admin)
app.use("/api/teams" ,teams )
app.use("/api/match", match )
app.use("/api/bets" , bets)
app.listen(3000, () => console.log("API: http://localhost:3000"));