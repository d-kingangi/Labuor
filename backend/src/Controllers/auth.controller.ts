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

/**
 * Asynchronously authenticates a user and returns the user information if successful.
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {'talent' | 'employer'} userType - The type of user (talent or employer)
 * @return {Promise<UserType | null>} The user information if authentication is successful, otherwise null
 */
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


/**
 * Authenticates an employer using the provided email and password.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a promise that resolves after handling the authentication
 */
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


/**
 * Handles the login process for a talent user.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} Promise that resolves when the login process is complete
 */
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


