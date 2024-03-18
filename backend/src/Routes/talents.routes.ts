import { Router } from "express";
import { createTalent, getTalentsPerIndustry, getAllTalents, getSingleTalent, updateTalent, deleteTalent } from "../Controllers/talent.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const talentRouter = Router()

talentRouter.post('/', createTalent)
talentRouter.get('/:id', getSingleTalent)
talentRouter.get('/industry/:industryId', getTalentsPerIndustry)
talentRouter.get('/', getAllTalents)
talentRouter.put('/:id',verifyToken, updateTalent)
talentRouter.delete('/:id', verifyToken, deleteTalent)

export default talentRouter