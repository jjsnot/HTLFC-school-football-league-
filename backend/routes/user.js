import {db} from "../db.js";
import {json, Router} from 'express';
import {toInt} from "./bets.js";


const router = Router();




export default router;
//GET
router.get('/', async (req_, res) => {
    res.json(await db.user.findMany({orderBy: {id:"asc"}}));
})
router.post('/', async (req, res) => {
    const email = req.body.email;
    const balance = toInt(req.body.avalible_balance);
    try{
        const user = await db.user.create({
            data: {email: email, avalible_balance: balance , frozen_balance: 0},
        })
        res.json(user)
    }catch(err){
        res.status(500).json({error:err})
    }
})