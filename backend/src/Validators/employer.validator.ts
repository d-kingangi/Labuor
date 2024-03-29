import joi from 'joi';

export const newEmployerSchema = joi.object({
    orgname: joi.string().required(),
    email: joi.string().required(),
    logo: joi.string(),
    industryId: joi.string().required(),
    employerWallet: joi.string(),
    password: joi.string().required(),
})