import joi from "joi";

export const newJobSchema = joi.object({
    jobname: joi.string().required(),
    orgId: joi.string().required(),
    industryId: joi.string().required(),
    description: joi.string().required(),
    duration: joi.string().required(),
    startdate: joi.date().required(),
    salary: joi.number().required(),
    talentId: joi.string(),  
})