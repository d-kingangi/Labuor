import { Router } from "express"; 
// import { verifyToken } from "../Middleware/verifyToken";
import { createApplication } from "../Controllers/applications.controller";

const applicationRouter = Router()

applicationRouter.post('/', createApplication)

export default applicationRouter