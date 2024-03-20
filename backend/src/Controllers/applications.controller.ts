import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { sqlConfig } from "../Config/sql.config";
import { application } from "../Interfaces/application.interface";
import { createApplicationSchema } from "../Validators/applicants.validator";

export const createApplication = async (req: Request, res: Response) => {
    try {
        
        const application: application = req.body

        const applicationId = v4

        const {error} = createApplicationSchema.validate(req.body)

        if(error){
            return res.json({ error: error })
        } else {

            const { jobId, orgId, talentId } = req.body;

            const pool = await mssql.connect(sqlConfig);

            if(pool.connected){
                const result = (await pool.request()
                .input("applicationId", mssql.VarChar, applicationId)
                .input("jobId", mssql.VarChar, jobId)
                .input("orgId", mssql.VarChar, orgId)
                .input("talentId", mssql.VarChar, talentId)
                // .input("status", mssql.VarChar, status)
                .execute('createApplication')).rowsAffected

                if  (result[0]>0) {
                    return res.json({ message: "Application created successfully" })
                } else {
                    return res.json({ error: "Failed to create application" })
                } 
            }else {
                return res.json({ error: "Failed to establish database connection" });
            }
        }

    } catch (error) {
        return res.json({ error });
    }
}


export const getJobApplications = async (req: Request, res: Response) =>{
    try {
        const { jobId } = req.params;

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("jobId", mssql.VarChar, jobId)
            .execute('getJobApplications');

        return res.json({
            applications: result.recordset
        });

    } catch (error) {
        return res.json({ error }); 
    }
}

export const getTalentApplications = async (req: Request, res: Response) => {
    try {
        const { talentId } = req.params;

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("talentId", mssql.VarChar, talentId)
            .execute('getTalentApplications');

        return res.json({
            applications: result.recordset
        });
    } catch (error) {
        return res.json({ error });
    }
}


export const updateApplication = async (req: Request, res: Response) => {
    try {
        const { applicationId, status } = req.body;

        const pool = await mssql.connect(sqlConfig);

        await pool.request()
            .input("applicationId", mssql.VarChar, applicationId)
            .input("status", mssql.VarChar, status)
            .execute('updateApplication');

        return res.json({ message: 'Application updated successfully' });
    } catch (error) {
        return res.json({ error });
    }
}


export const deleteApplication = async (req: Request, res: Response) => {
    try {
        const { applicationId } = req.params;

        const pool = await mssql.connect(sqlConfig);

        await pool.request()
            .input("applicationId", mssql.VarChar, applicationId)
            .execute('deleteApplication');

        return res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        return res.json({ error });
    }
}