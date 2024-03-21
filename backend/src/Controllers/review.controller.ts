import mssql from 'mssql';
import { Request, Response } from "express";
import {v4} from 'uuid';
import { review } from '../Interfaces/review.interface';
import { sqlConfig } from '../Config/sql.config';
import { newReviewSchema } from '../Validators/review.validator';

export const createReview = async (req:Request, res: Response) => {
    try {
        const id = v4()

        const {talentId, orgId, comment}: review = req.body

        let {error} = newReviewSchema.validate(req.body)

        if(error){
            return res.json({
                error: error
            })
        }
        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("reviewId", id)
        .input("talentId", talentId)
        .input("orgId", orgId)
        .input("comment", comment)
        .execute('createReview'))

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            return res.status(200).json({ success: true, message: 'Review created successfully' });
        } else {
            return res.status(500).json({ success: false, error: 'Failed to create review' });
        }

    } catch (error) {
        return res.json({error})
    }
}

export const getTalentReviews = async (req:Request, res: Response) => {
    try {
        const talentId = req.params.talentId

        const pool = await mssql.connect(sqlConfig)

        let reviews = (await pool.request()
        .input("talentId", talentId)
        .execute('getTalentReview')).recordset

        return res.json({reviews})

    } catch (error) {
        return res.json({error})    
    }
}

