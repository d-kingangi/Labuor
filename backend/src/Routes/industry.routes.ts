import { Router } from "express";
import { createIndustry, getOneIndustry, getAllIndustries, updateIndustry, deleteIndustry } from "../Controllers/industry.controller"; 
import { verifyToken } from "../Middlewares/verifyToken";


const industryRouter = Router()

industryRouter.post('/', createIndustry)
industryRouter.get('/:id', getOneIndustry)
industryRouter.get('/', getAllIndustries)
industryRouter.put('/:id', verifyToken, updateIndustry)
industryRouter.delete('/:id', verifyToken, deleteIndustry)


export default industryRouter