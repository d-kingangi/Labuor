import joi from "joi"

export const newReviewSchema = joi.object({
    talentId: joi.string().required(),
    orgId: joi.string().required(),
    comment: joi.string().required()
})