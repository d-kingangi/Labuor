import { Router } from "express";
import { createApplication, updateApplication, deleteApplication, getJobApplications, getTalentApplications } from "../Controllers/applications.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const applicationRouter = Router()

applicationRouter.post('/',  createApplication)
applicationRouter.put('/:applicationId',  updateApplication)
applicationRouter.delete('/:applicationId',  deleteApplication)
applicationRouter.get('/job/:jobId', getJobApplications)
applicationRouter.get('/talent/:talentId', getTalentApplications)

export default applicationRouter