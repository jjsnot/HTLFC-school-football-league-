import {json, Router} from 'express';
import {requireAdmin} from "../middleware/requireAdmin.js";
import {db} from "../db.js";
const router = Router();
const toInt = (v) => {
    if (v === undefined || v === null || v === "") return null;
    const n = Number.parseInt(String(v), 10);
    return Number.isInteger(n) ? n : null;
};


export default router;
//GET
router.get('/', async (req_, res) => {
    res.json(await db.bets.findMany({orderBy: {id:"asc"}}));
})
//POST
router.post('/', async (req_, res) => {



})
