import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { employer } from '../Interfaces/employer.interface';
import { sqlConfig } from '../Config/sql.config';
import { newEmployerSchema } from '../Validators/employer.validator';

export const createEmployer = async (req: Request, res: Response) => {
    try {
        const id = v4()

        const {orgname, email, logo, industryId, employerWallet, password }: employer = req.body

        const hashed_pwd = await bcrypt.hash(password, 6)

        let {error} = newEmployerSchema.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }
        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("orgId", mssql.VarChar, id)
        .input("orgname", mssql.VarChar, orgname)
        .input("email", mssql.VarChar, email)
        .input("logo", mssql.VarChar, logo)
        .input("industryId", mssql.VarChar, industryId)
        .input("employerWallet", mssql.VarChar, employerWallet)
        .input("password", mssql.VarChar, hashed_pwd)
        .execute('createEmployer')).rowsAffected

        return res.json({
            message:"Account created successfully",
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getAllEmployers = async(req: Request, res: Response)=>{
    try{
        const pool = await mssql.connect(sqlConfig);

        const allemployers = (await pool.request().execute('getAllEmployers')).recordset

        return res.status(200).json({
            employers: allemployers
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getSingleEmployer = async (req: Request, res:Response) => {
    try {
        const id = req.params.id

    const pool = await mssql.connect(sqlConfig)

    let employer = (await pool.request().input("employerId", id).execute('getSingleEmployer')).recordset

    return res.json({
        employer
    })
    } catch (error) {
        return res.json({error})
    }
}

export const updateEmployer = async (req:Request, res: Response) => {
    try {
        const id = req.params.id

        const {orgname, email, logo, industryId, employerWallet, password}: employer = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("orgId", id)
        .input("orgname", mssql.VarChar, orgname)
        .input("email", mssql.VarChar, email)
        .input("logo", mssql.VarChar, logo)
        .input("industryId", mssql.VarChar, industryId)
        .input("employerWallet", mssql.VarChar, employerWallet)
        .input("password", mssql.VarChar,)
        .execute('updateEmployer')).rowsAffected

        console.log(result);

        return res.status(200).json({
            message: "Account updated successfully"
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getEmployerPerIndustry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let talents = (await pool.request().input("industryId", id).execute('getEmployersPerIndustry'))

        return res.json({
            talents
        })
    } catch (error) {
        return res.json({error})
    }
    
}

export const deleteEmployer = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("employerId", mssql.VarChar, id)
        .execute('deleteEmployer')).rowsAffected

        if(result[0] == 0){
            return res.json({
                error: "Account not found"
            })
        }else{
            return res.status(200).json({
                message: "Account deleted successfully"
            })
        }
    } catch (error) {
        return res.json({error})
    }
}