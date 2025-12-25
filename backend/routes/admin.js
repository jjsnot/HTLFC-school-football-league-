import {json, Router} from 'express';
import {db} from '../db.js';

import prismaPkg from "@prisma/client";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
const { Prisma } = prismaPkg;
dotenv.config();

function signToken(){
    return jwt.sign(
        {sub: "admin"} ,
        process.env.JWT_SECRET ,
        {
            expiresIn: process.env.JWT_EXPIRES_IN ?? "5h",
        });
}


const router = Router();

//POST
router.post("/", async (req, res) => {
    const login = String(req.body?.login ?? "").trim();
    const password = String(req.body?.password ?? "");
    console.log("ENV USERNAME =", JSON.stringify(process.env["username"]));
    console.log("ENV PASSWORD =", JSON.stringify(process.env.password));
    console.log("BODY login   =", JSON.stringify(login));
    console.log("BODY password=", JSON.stringify(password));
    if(login ===process.env["username"] && password === process.env.password) {
        return res.json({token: signToken()});
    }else{
        return res.status(401).json({error: "Invalid credentials"})
    }

})
export default router;