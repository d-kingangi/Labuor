import joi from "joi";

export const newMessageSchema = joi.object({
    orgId: joi.string().required(),
    talentId: joi.string().required(),
    content: joi.string().required(),
    timestamp: joi.date().required(),
})