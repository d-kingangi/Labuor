import { Router } from "express";
import { createReview, getTalentReviews } from "../Controllers/review.controller";

const reviewRouter = Router()

reviewRouter.post('/', createReview)
reviewRouter.get('/talent/:talentId', getTalentReviews)

export default reviewRouter