import { Router } from "express";
import { createEmployer, getSingleEmployer, getAllEmployers, updateEmployer, deleteEmployer } from "../Controllers/employer.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const employerRouter = Router()

employerRouter.post('/', createEmployer)
employerRouter.get('/:id', getSingleEmployer)
employerRouter.get('/', getAllEmployers)
employerRouter.put('/:id', verifyToken, updateEmployer)
employerRouter.delete('/:id', verifyToken, deleteEmployer)

export default employerRouter