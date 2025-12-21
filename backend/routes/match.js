import { Router} from 'express';
import {db} from '../db.js';

import prismaPkg from "@prisma/client";
const { Prisma } = prismaPkg;

const router = Router();

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

//GET /****api****/match
router.get('/', async (req_, res) => {
    res.json(await db.match.findMany({orderBy: {id:"asc"}}));
})
router.post('/create_round', async (req, res) => {
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
               team2Id:teams[i + 1].id
           });
           }
       const created_matches = await db.match.createMany({data});
       return res.status(201).json({round , matchesCreated: created_matches.count});



   }catch(err){
       return res.status(400).json({error: "Error creating round!"});
   }
}


})


export default router;