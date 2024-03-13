import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import {v4} from 'uuid';
import {talent} from "../Interfaces/talent.interface";
import { sqlConfig } from "../Config/sql.config";
import { newTalentSchema } from '../Validators/talent.validator';


/**
 * Create a talent with the given information.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a Promise that resolves to nothing
 */
export const createTalent = async(req: Request, res: Response)=>{
    try {
        const id = v4()

        const { profileImg, firstname, lastname, email, industryId, speciality, talentWallet, location, phone, password}:talent = req.body

        const hashed_pwd = await bcrypt.hash(password, 6) 

        let {error} = newTalentSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                error: error
            })
        }

        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("talentId", mssql.VarChar, id)
        .input("profileImg", mssql.VarChar, profileImg)
        .input("firstname", mssql.VarChar, firstname)
        .input("lastname", mssql.VarChar, lastname)
        .input("email", mssql.VarChar, email)
        .input("industryId", mssql.VarChar, industryId)
        .input("speciality", mssql.VarChar, speciality)
        .input("talentWallet", mssql.VarChar, talentWallet)
        .input("location", mssql.VarChar, location)
        .input("phone", mssql.VarChar, phone)
        .input("password", mssql.VarChar, hashed_pwd)
        .execute('CreateTalent')).rowsAffected

        return res.json({
            message:"Account created successfully",
        })
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

/**
 * Retrieves all talents from the database and sends them as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a Promise that resolves when the talents are sent as a JSON response
 */
export const getAllTalents =  async(req: Request, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);

        let allTalents = (await pool.request().execute('getAllTalents')).recordset

        return res.status(200).json({
            talents: allTalents
        })
    } catch (error) {
        return res.json({error})
    }
}


/**
 * Function to retrieve a single talent.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} JSON response with the talent object or error
 */
export const getSingleTalent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let talent = (await pool.request().input("talentId", id).execute('getSingleTalent')).recordset

        return res.json({
            talent
        })
    } catch (error) {
        return res.json({error})
    }
}

/**
 * Retrieves talents based on industry ID and sends the result as JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} JSON response containing talents
 */
export const getTalentsPerIndustry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let talents = (await pool.request().input("industryId", id).execute('getTalentsPerIndustry'))

        return res.json({
            talents
        })
    } catch (error) {
        return res.json({error})
    }
    
}

/**
 * Update a talent profile.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} Promise that resolves when the talent is updated
 */
export const updateTalent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const{profileImg, firstname, lastname, email, industryId, speciality, talentWallet, location, phone, password}:talent = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("talentId", id)
        .input("profileImg", mssql.VarChar, profileImg)
        .input("firstname", mssql.VarChar, firstname)
        .input("lastname", mssql.VarChar, lastname)
        .input("email", mssql.VarChar, email)
        .input("industryId", mssql.VarChar, industryId)
        .input("speciality", mssql.VarChar, speciality)
        .input("talentWallet", mssql.VarChar, talentWallet)
        .input("location", mssql.VarChar, location)
        .input("phone", mssql.VarChar, phone)
        .input("password", mssql.VarChar, password)
        .execute('updateTalent')).rowsAffected

        console.log(result);

        return res.json({
            message: "Talent updated successfully"
        })   
    } catch (error) {
        return res.json({error})
    }
}


/**
 * deleteTalent function deletes a talent from the database using the provided talent ID.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} Promise that resolves once the talent is deleted
 */
export const deleteTalent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("talentId", mssql.VarChar, id)
        .execute('deleteTalent')).rowsAffected

        if(result[0] == 0){
            return res.status(201).json({
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
