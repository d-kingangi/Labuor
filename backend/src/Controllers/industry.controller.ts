import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { newIndustrySchema } from "../Validators/industry.validator";
import { industry } from "../Interfaces/industry.interface";

export const createIndustry = async (req: Request, res: Response) => {
    try {
        const id = v4()

        const{industryName}: industry = req.body

        let {error} =newIndustrySchema.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }

        const industryData: industry = {industryId: id, industryName}

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("industryId", mssql.VarChar, id)
        .input("industryName", mssql.VarChar, industryName)
        .execute('createIndustry')).rowsAffected

        return res.json({
            message:"Industry created successfully",
        })
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

export const getAllIndustries = async (req: Request, res:Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)

        let allindustries = (await pool.request().execute('getAllIndustries')).recordset

        return res.status(200).json({
            industries: allindustries
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getOneIndustry = async(req: Request, res:Response)=>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        let industry = (await pool.request().input("industryId", id).execute('getOneIndustry')).recordset
        return res.json({
            industry
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateIndustry = async (req:Request, res: Response) => {
    try {
        const id = req.params.id

        const {industryName}: industry = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("industryId", id)
        .input("industryName", mssql.VarChar, industryName)
        .execute('updateIndustry')).rowsAffected

        console.log(result);

        return res.json({
            message: "Industry updated successfully"
        })
    } catch (error) {
        
    }
}

export const deleteIndustry = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("industryId", mssql.VarChar, id)
        .execute('deleteIndustry')).rowsAffected

        console.log(result[0]);

        if(result[0] == 0){
            return res.status(201).json({
                error: "Industry not found"
            })
        }else{
            return res.status(200).json({
                message: "Industry deleted successfully"
            })
        }
    } catch (error) {
        return res.json({error})
    }
}