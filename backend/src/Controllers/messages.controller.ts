import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { message } from '../Interfaces/message.interface';
import { newMessageSchema } from '../Validators/message.validator';
import { sqlConfig } from '../Config/sql.config';

/**
 * Create a message using the provided request body and store it in the database.
 *
 * @param {Request} req - the request object containing message details
 * @param {Response} res - the response object to send the result or error
 * @return {Promise<void>} returns void
 */

export const createMessage = async (req:Request, res: Response) => {
    try {
        const id = v4()

        const {orgId, talentId, content, timestamp}: message = req.body

        let {error} = newMessageSchema.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }
        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("messageId", id)
        .input("orgId", orgId)
        .input("talentId", talentId)
        .input("content", content)
        .input("timestamp", timestamp)
        .execute('createMessage'))

        return res.json({
            result
        })
    } catch (error) {
        return res.json({error})
    }
}

export  const getTalentMessages = async (req:Request, res: Response) => {
    try {
        const talentId = req.params.talentId

        const pool = await mssql.connect(sqlConfig)

        let messages = (await pool.request()
        .input("talentId", talentId)
        .execute('getTalentMessages')).recordset
    } catch{
        
    }
}