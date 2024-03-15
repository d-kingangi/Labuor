import { Router } from "express";
import { createMessage } from "../Controllers/messages.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const messageRouter = Router()

messageRouter.post('/', verifyToken, createMessage)

export default messageRouter