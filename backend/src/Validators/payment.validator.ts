import joi from "joi";

export const newPaymentSchema = joi.object({
    paymentId: joi.string().required(),
    employerWallet: joi.string().required(),
    talentWallet: joi.string().required(),
    jobId: joi.string().required()
})