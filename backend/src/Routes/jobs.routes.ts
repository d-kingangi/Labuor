import { Router } from "express";
import { createJob, deleteJob, getEveryJob, getAllJobsByIndustry, getJobsByEmployer, getSingleJob, updateJob, getJobsForTalent } from "../Controllers/jobs.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const jobRouter = Router()

jobRouter.post('/', createJob)
jobRouter.get('/:id', getSingleJob)
jobRouter.get('/industry/:industryId', getAllJobsByIndustry)
jobRouter.get('/employer/:orgId', getJobsByEmployer)
jobRouter.get('/',  getEveryJob)
jobRouter.put('/:id', verifyToken, updateJob)
jobRouter.delete('/:id', verifyToken, deleteJob)
jobRouter.get('/talent/:talentId', getJobsForTalent)

export default jobRouter