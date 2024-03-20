import joi from 'joi'

export const createApplicationSchema = joi.object({
    jobId: joi.string().required(),
    orgId: joi.string().required(),
    talentId: joi.string().required()
})