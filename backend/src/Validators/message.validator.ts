import joi from "joi";

export const newMessageSchema = joi.object({
    messageId: joi.string().required(),
    orgId: joi.string().required(),
    talentId: joi.string().required(),
    content: joi.string().required(),
    timestamp: joi.date().required(),
})