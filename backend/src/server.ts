import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import cors from 'cors';
import industryRouter from './Routes/industry.routes';
import talentRouter from './Routes/talents.routes';
import employerRouter from './Routes/employers.routes';
import authRouter from './Routes/auth.routes';
const multer  = require('multer')

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

app.use('/industry', industryRouter)
app.use('/talent', talentRouter)
app.use('/employer', employerRouter)
app.use('/auth', authRouter)
// app.use('/jobs', jobsRouter)

const PORT = process.env.PORT as string;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error
    })
})

mssql.connect(sqlConfig, (err?: Error, connect?: ConnectionPool, req?: Request, res?: Response) => {
    if (err) {
        res?.status(500).json({
            err
        })
    } else if (connect) {
        console.log("connected to mssql db");
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        })
    }
})