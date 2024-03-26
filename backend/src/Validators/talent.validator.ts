import joi from "joi";

export const newTalentSchema = joi.object({
    profileImg: joi.string(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().required(),
    industryId: joi.string().required(),
    speciality: joi.string().required(),
    talentWallet: joi.string(),
    location: joi.string().required(),
    phone: joi.string().required(),
    password: joi.string().required()
})