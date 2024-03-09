import joi from 'joi'

export const newIndustrySchema = joi.object({
    industryId: joi.string().required(),
    industryName: joi.string().required()
})