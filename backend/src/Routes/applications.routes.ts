import { Router } from "express";
import { createApplication, updateApplication, deleteApplication, getJobApplications, getTalentApplications } from "../Controllers/applications.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const applicationRouter = Router()

applicationRouter.post('/', verifyToken, createApplication)
applicationRouter.put('/:applicationId', verifyToken, updateApplication)
applicationRouter.delete('/:applicationId', verifyToken, deleteApplication)
applicationRouter.get('/job/:jobId', verifyToken, getJobApplications)
applicationRouter.get('/talent/:talentId', verifyToken, getTalentApplications)

export default applicationRouter