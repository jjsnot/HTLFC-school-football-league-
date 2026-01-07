import { Router} from 'express';
import {db} from '../db.js';

import prismaPkg from "@prisma/client";
import {requireAdmin} from "../middleware/requireAdmin.js";
const { Prisma } = prismaPkg;

const router = Router();

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

//GET /****api****/match
router.get('/', requireAdmin, async (req_, res) => {
    res.json(await db.match.findMany({orderBy: {id:"asc"}}));
})

//POST /api/match
router.post('/',requireAdmin ,  async (req, res) => {
    const toInt = (v) => {
        if (v === undefined || v === null || v === "") return null;
        const n = Number.parseInt(String(v), 10);
        return Number.isInteger(n) ? n : null;
    };

    const toDateOrNull = (v) => {
        if (v === undefined || v === null || v === "") return null;
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? null : d;
    };
    const round = toInt(req.body?.round) ?? 1;

    const team1Id = toInt(req.body?.team1Id);
    const team2Id = toInt(req.body?.team2Id);

    const statusRaw = String(req.body?.status ?? "scheduled").toLowerCase();
    const allowedStatus = new Set(["scheduled", "live", "finished"]);
    const status = allowedStatus.has(statusRaw) ? statusRaw : null;

    const duration = toInt(req.body?.duration) ?? 15;
    const endTime = toDateOrNull(req.body?.endTime);


    const firstTeamScore = req.body?.firstTeamScore === undefined ? null : toInt(req.body?.firstTeamScore);
    const secondTeamScore = req.body?.secondTeamScore === undefined ? null : toInt(req.body?.secondTeamScore);

    if (!Number.isInteger(round) || round < 1) {
        return res.status(400).json({ error: "round must be integer >= 1" });
    }

    if (team1Id === null || team2Id === null) {
        return res.status(400).json({ error: "team1Id and team2Id are required integers" });
    }

    if (team1Id === team2Id) {
        return res.status(400).json({ error: "team1Id and team2Id must be different" });
    }

    if (!status) {
        return res.status(400).json({ error: "status must be one of: scheduled, live, finished" });
    }


    if(duration < 0){
        return res.status(400).json({ error: "Duration must be >= 0" });
    }

    if (firstTeamScore !== null && (firstTeamScore < 0)) {
        return res.status(400).json({ error: "firstTeamScore must be >= 0" });
    }
    if (secondTeamScore !== null && (secondTeamScore < 0)) {
        return res.status(400).json({ error: "secondTeamScore must be >= 0" });
    }
    const is_next_round = await db.match.findFirst({where:{round: round + 1}});
    if(is_next_round){
        return res.status(400).json({ error: `Round: ${round} is already over` });
    }


    if (status === "finished") {
        if (firstTeamScore === null || secondTeamScore === null) {
            return res.status(400).json({ error: "Scores are required when status is finished" });
        }
    }
    const [t1, t2] = await Promise.all([
        db.team.findUnique({ where: { id: team1Id } }),
        db.team.findUnique({ where: { id: team2Id } }),
    ]);

    if (!t1 || !t2) {
        return res.status(404).json({ error: "One or both teams not found" });
    }


    const duplicate = await db.match.findFirst({
        where:
            {round ,
            OR: [
                {team1Id:team1Id, team2Id:team2Id },
                {team2Id:team1Id, team1Id:team2Id },
            ]}
    });
    if(duplicate){
        return res.status(400).json({ error: "This match already exists in this round" });
    }

    try {
        const match = await db.match.create({
            data: {
                round,
                team1Id,
                team2Id,
                status,
                duration,
                endTime,
                firstTeamScore,
                secondTeamScore,
            },
        });
        return res.status(201).json(match);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: err.message});
    }



})
//POST /api/match/create_round
router.post('/create_round', requireAdmin , async (req, res) => {
let teams = await db.team.findMany({orderBy: {name:"asc"}});
const round = Number.parseInt(req.body?.round ?? 1, 10);
if (teams.length < 2) {
    return res.status(400).json({error: "Not enough teams!"});
}
if(!Number.isInteger(round) || round < 1) {
    return res.status(400).json({error: "Invalid round number!"});
}
if(teams.length % 2 !== 0) {
    return res.status(400).json({error: "add BYE team!"});
}
const exists = await db.match.findFirst({ where: { round } });
if (exists) {
    return res.status(409).json({ error: `Round ${round} already exists` });
}
if(round === 1){
    const data = [];
    teams = shuffle([...teams]);
   try{
       for(let i = 0; i < teams.length; i+=2){
           data.push({
               round,
               team1Id:teams[i].id,
               team2Id:teams[i + 1].id,
               duration: 15
           });
           }
       const created_matches = await db.match.createMany({data});
       return res.status(201).json({round , matchesCreated: created_matches.count});



   }catch(err){
       return res.status(400).json({error: err.message});
   }
}else {
    return res.status(400).json({error: "Invalid round number!"});
}


})
// PATCH /api/match/:id
router.patch("/:id", requireAdmin ,async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid match id" });
    }

    const allowedStatus = new Set(["scheduled", "live", "finished"]);


    const toIntOrNull = (v) => {
        if (v === undefined) return undefined;
        if (v === null || v === "") return null;
        const n = Number.parseInt(String(v), 10);
        return Number.isInteger(n) ? n : NaN;
    };

    const toDateOrNull = (v) => {
        if (v === undefined) return undefined;
        if (v === null || v === "") return null;
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? NaN : d;
    };

    const data = {};

    // status
    if (req.body?.status !== undefined) {
        const s = String(req.body.status).toLowerCase();
        if (!allowedStatus.has(s)) {
            return res.status(400).json({ error: "status must be scheduled|live|finished" });
        }
        const isLive = await db.match.findFirst({where:{status:"live"}});
        if(isLive && s === "live") {
            return res.status(400).json({ error: "Only one match can be live!"});
        }

        data.status = s;
    }

    //

    const endTime = toDateOrNull(req.body?.endTime);
    if (endTime !== undefined) {
        if (endTime !== null && Number.isNaN(endTime)) {
            return res.status(400).json({ error: "endTime must be a valid date or null" });
        }
        data.endTime = endTime;
    }else {
        data.endTime = new Date();
    }

    // scores
    const s1 = toIntOrNull(req.body?.firstTeamScore);
    if (s1 !== undefined) {
        if (Number.isNaN(s1) || (s1 !== null && s1 < 0)) {
            return res.status(400).json({ error: "firstTeamScore must be integer >= 0 or null" });
        }
        data.firstTeamScore = s1;
    }

    const s2 = toIntOrNull(req.body?.secondTeamScore);
    if (s2 !== undefined) {
        if (Number.isNaN(s2) || (s2 !== null && s2 < 0)) {
            return res.status(400).json({ error: "secondTeamScore must be integer >= 0 or null" });
        }
        data.secondTeamScore = s2;
    }

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: "nothing to update" });
    }

    try {
        const updated = await db.match.update({
            where: { id },
            data,
        });
        return res.json(updated);
    } catch (err) {
        if (err?.code === "P2025") return res.status(404).json({ error: "match not found" });
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});
export default router;