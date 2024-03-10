import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/sql.config"
import { loginUserSchema } from "../Validators/auth.validator";
import { ExtendedUserRequest } from "../Middlewares/verifyToken";

interface UserType {
    user: any;
    userType: 'talent' | 'employer';
}

export const loginUser = async (email: string, password: string, userType: 'talent' | 'employer'): Promise<UserType | null> => {
    try {
        let { error } = loginUserSchema.validate({ email, password });

        if (error) {
            return null;
        }

        const pool = await mssql.connect(sqlConfig);

        let user = (await pool.request().input('email', email).input('password', password).execute(`login${userType}`))
            .recordset;

        if (user[0]?.email == email) {
            const correctPwd = await bcrypt.compare(password, user[0].password);

            if (!correctPwd) {
                return null;
            }

            const loginCredentials = user.map((response) => {
                const { password, ...rest } = response;
                return rest;
            });

            return {
                user: loginCredentials[0],
                userType,
            };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const loginEmployer = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password, 'employer');

    if (result) {
        const token = jwt.sign(result, process.env.SECRET as string, { expiresIn: '36000s' });
        return res.status(200).json({
            message: 'Logged in successfully',
            token,
            userType: result.userType,
        });
    } else {
        return res.status(201).json({
            error: 'User not found or incorrect password',
        });
    }
};

export const loginTalent = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password, 'talent');

    if (result) {
        const token = jwt.sign(result, process.env.SECRET as string, { expiresIn: '36000s' });
        return res.status(200).json({
            message: 'Logged in successfully',
            token,
            userType: result.userType,
        });
    } else {
        return res.status(201).json({
            error: 'User not found or incorrect password',
        });
    }
};

export const checkUserDetails =async (req: ExtendedUserRequest, res: Response) => {
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}

//remember to implement the recover password

export const resetPassword = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body

        const pool = await mssql.connect(sqlConfig)

        let hashedPwd = await bcrypt.hash(password, 5)

        let result = (await pool.request()
        .input("email", email)
        .input("password", password)
        .execute("resetPassword")).rowsAffected

        if(result[0] < 1){
            return res.json({
                message: "User not found"
            })
        }else{
            return res.json({
                message: "Password updated successfully"
            })
        }
    } catch (error) {
        return res.sendStatus(501).json({
            error: error
        })
    }
}

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('token'); 
    res.json({ message: 'Logout successful' });
};

export const logoutTalent = (req: Request, res: Response) => {
    logoutUser(req, res);
};

export const logoutEmployer = (req: Request, res: Response) => {
    logoutUser(req, res);
};


