import "dotenv/config";
import express from "express";
import cors from "cors";
import teams from "./routes/teams.js";



const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));


app.use("/api/teams" ,teams )
app.listen(3000, () => console.log("API: http://localhost:3000"));