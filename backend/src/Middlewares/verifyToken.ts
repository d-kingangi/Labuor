import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { talent, loginTalentDetails } from '../Interfaces/talent.interface';
import { employer, loginEmployerDetails } from "../Interfaces/employer.interface";

dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?: loginTalentDetails | loginEmployerDetails;
}

export const verifyToken = (req: ExtendedUserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string;

        if (!token) {
            return res.status(401).json({
                message: 'You do not have access',
            });
        }

        let data: loginTalentDetails | loginEmployerDetails;
        try {
            data = jwt.verify(token, process.env.SECRET as string) as loginTalentDetails;
            req.info = data;
        } catch (talentError) {
            try {
                data = jwt.verify(token, process.env.SECRET as string) as loginEmployerDetails;
                req.info = data;
            } catch (employerError) {
                return res.status(403).json({
                    error: 'Forbidden: Invalid token',
                });
            }
        }

        next();
    } catch (error) {
        return res.json({
            error: error,
        });
    }
};