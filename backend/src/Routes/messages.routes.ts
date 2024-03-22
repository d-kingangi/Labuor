import { Router } from "express";
import { createMessage,  getTalentMessages, getEmployerMessages, getChatSessionMessages, updateMessageStatus } from "../Controllers/messages.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const messageRouter = Router()

messageRouter.post('/',  createMessage);
messageRouter.get('/talent/:talentId', getTalentMessages);
messageRouter.get('/employer/:orgId', getEmployerMessages);
messageRouter.get('/talent/:talentId/employer/:employerId', getChatSessionMessages);
messageRouter.put('/:messageId', updateMessageStatus);

export default messageRouter