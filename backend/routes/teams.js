import {Router} from 'express';
import {db} from '../db.js';

import prismaPkg from "@prisma/client";
const { Prisma } = prismaPkg;

const router = Router();

//GET /api/teams
router.get('/', async (_req, res) => {
    const teams = await db.team.findMany({orderBy: {name:"asc"}});
    res.json(teams);
})
router.post('/', async (req, res) => {
    const name = String(req.body?.name ?? "").trim().toUpperCase();
    const scoreRaw = req.body?.score;
    if(!name) return res.status(400).json({error: "Name is required"});
    const score = scoreRaw === undefined || scoreRaw === null ? 0 : Number(scoreRaw);
    if(!Number.isInteger(score) || score < 0) return res.status(400).json({error: "Score must be an integer >=0"});
    try{
        const team = await db.team.create({ data:{name , score}})
        return res.status(201).json(team)
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            return res.status(409).json({ error: "Team name must be unique" });
        }
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})
export default router;