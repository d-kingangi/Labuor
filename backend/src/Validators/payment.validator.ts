import joi from "joi";

export const newPaymentSchema = joi.object({
    employerWallet: joi.string().required(),
    talentWallet: joi.string().required(),
    jobId: joi.string().required()
})