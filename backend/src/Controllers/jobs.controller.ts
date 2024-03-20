import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { job } from '../Interfaces/job.interface';
import { sqlConfig } from '../Config/sql.config';
import { newJobSchema } from '../Validators/job.validator';

// createJob, deleteJob, getEveryJob, getAllJobsByIndustry, getJobsByEmployer, getSingleJob, updateJob
/**
 * Creates a new job using the provided request data.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a Promise that resolves with the result of creating a new job
 */
export const createJob = async (req:Request, res: Response) => {
    try {
        const id = v4()
        
        const {jobname, orgId, industryId, description, duration, startdate, salary, talentId}: job = req.body

        let {error} = newJobSchema.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }
        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("jobId", mssql.VarChar, id)
        .input("jobname", mssql.VarChar, jobname)
        .input("orgId", mssql.VarChar, orgId)
        .input("industryId", mssql.VarChar, industryId)
        .input("description", mssql.VarChar, description)
        .input("duration", mssql.VarChar, duration)
        .input("startdate", mssql.DateTime, startdate)
        .input("salary", mssql.BigInt, salary)
        .input("talentId", mssql.VarChar, talentId)
        .execute('createJob')).rowsAffected

        return res.json({
            message:"Job created successfully",
        })

    } catch (error) {
        return res.json({error})
    }
}


/**
 * Retrieves every job from the database and sends it as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} JSON response with all jobs or an error object
 */
export const getEveryJob = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const alljobs = (await pool.request().execute("getEveryJob")).recordset;

        return res.json({
            jobs: alljobs
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getAllJobsByIndustry = async (req: Request, res: Response) => {
    try {
        const id = req.params.industryId;

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
            .input("industryId", id)
            .execute('getAllJobsByIndustry')).recordset;

        let jobs = result

        return res.json({ jobs });
    } catch (error) {
        return res.json({error})
    }
} 

export const getJobsByEmployer = async (req: Request, res: Response) => {
    try {
        const id = req.params.orgId

        const pool = await mssql.connect(sqlConfig)

        let jobs = (await pool.request().input("orgId", id).execute('getJobsByEmployer')).recordset;

        return res.json({
            jobs
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getSingleJob = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let job = (await pool.request().input("jobId", id).execute('getSingleJob')).recordset;

        return res.json({
            job
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getJobsForTalent = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("talentId", talentId)
        .execute('getJobsForTalent')).recordset;

        const jobs = result

        return res.json({jobs})

    } catch (error) {
        return res.json({ error: 'Internal server error'})
    }
}

export const updateJob = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const{jobname, orgId, industryId, description, duration, startdate, salary, talentId}: job = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("jobId", mssql.VarChar, id)
        .input("jobname", mssql.VarChar, jobname)
        .input("orgId", mssql.VarChar, orgId)
        .input("industryId", mssql.VarChar, industryId)
        .input("description", mssql.VarChar, description)
        .input("duration", mssql.VarChar, duration)
        .input("startdate", mssql.DateTime, startdate)
        .input("salary", mssql.BigInt, salary)
        .input("talentId", mssql.VarChar, talentId)
        .execute('updateJob')).rowsAffected

        console.log(result);

        return res.status(200).json({
            message: "Job updated successfully"
        })
    } catch (error) {
        return res.json({error})
    }
}

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("jobId", mssql.VarChar, id)
        .execute('updateJob')).rowsAffected

        return res.json({
            message: "Job deleted successfully"
        })

    }catch (error) {
        return res.json({error})
    }
}