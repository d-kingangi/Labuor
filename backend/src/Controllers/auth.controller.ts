import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/sql.config"
import { loginUserSchema } from "../Validators/auth.validator";
import { ExtendedUserRequest } from "../Middlewares/verifyToken";


export const loginUser = async(req: Request, res: Response)=>{
    try {
        const{email, password} = req.body

        let {error} = loginUserSchema.validate(req.body)

        if(error){
            return res.status(201).json({
                error: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig)
        
        let user = (await pool.request()
        .input("email", email)
        .input("password", password)
        .execute("loginUser")).recordset
        
        if(user[0]?.email == email){
            const correct_pwd = await bcrypt.compare(password, user[0].password)

            if(!correct_pwd){
                 return res.status(201).json({
                    error: "Incorrect password"
                 });
            }

            const loginCredentials = user.map(response =>{
                const{password, ...rest} = response

                return rest
            })            

            const token = jwt.sign(loginCredentials[0], process.env.SECRET as string, {
                expiresIn: '36000s'
            })
            
            return res.status(200).json({
                message: "Logged in successfully", token,
                ...loginCredentials[0]
            })
            
        }else{
            return res.json({
                error: "User not found"
            });
        }
        

    } catch (error) {
        return res.sendStatus(501).json({
            error: "Internal Server Error"
        })
    }
}


/**
 * Check user details and return info if available.
 *
 * @param {ExtendedUserRequest} req - the extended user request object
 * @param {Response} res - the response object
 * @return {object} the JSON object with user info, if available
 */
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


/**
 * Logs out the user by clearing the token cookie and sending a JSON response for successful logout.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {void} 
 */
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


