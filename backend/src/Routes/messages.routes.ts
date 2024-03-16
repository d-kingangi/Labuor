import { Router } from "express";
import { createMessage,  getTalentMessages, getEmployerMessages, getChatSessionMessages, updateMessageStatus } from "../Controllers/messages.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const messageRouter = Router()

messageRouter.post('/', verifyToken, createMessage);
messageRouter.get('/talent/:talentId', verifyToken, getTalentMessages);
messageRouter.get('/employer/:employerId', verifyToken, getEmployerMessages);
messageRouter.get('/talent/:talentId/employer/:employerId', verifyToken, getChatSessionMessages);
messageRouter.put('/:messageId', verifyToken, updateMessageStatus);

export default messageRouter