import express, { Router, Request, Response } from 'express';
import path, { dirname } from 'path';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()
const router:Router = express.Router()

router.post('/regist', async (req: Request, res: Response) => {
    const {username, password} = req.body
    console.log(req.body)
    await prisma.users.create({
        data : {
            username : username,
            password : password
        }
    })
    res.json({
        "result" : "success"
    })
})

router.get("/registUser", (req:Request, res:Response) => {
    const filePath = path.join(__dirname, "regist.html")
    res.sendFile(filePath)
})

router.post('/loginProc', async (req : Request, res: Response) => {

    const User = await prisma.users.findFirst({
        where : {
            username : req.body.username,
            password : req.body.password
        }
    })

    if(User){
        res.json({
            "result" : "success",
            "username" : User.username,
            "password" : User.password
        })
    }
    else{
        res.json({
            "result" : "fail"
        })
    }
})

router.get("/", (req : Request, res: Response) => {
    const filePath = path.join(__dirname, "login.html")
    res.sendFile(filePath)
})


export default router