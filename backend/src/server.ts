import express, { json, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sqlConfig } from './Config/sql.config';
import mssql, { ConnectionPool } from 'mssql';
import cors from 'cors';
import industryRouter from './Routes/industry.routes';
import talentRouter from './Routes/talents.routes';
import employerRouter from './Routes/employers.routes';
import authRouter from './Routes/auth.routes';
import jobsRouter from './Routes/jobs.routes';
import http from 'http'
import WebSocket from 'ws'

const multer  = require('multer')

const app = express();
dotenv.config();

// websockets
const server = http.createServer(express)
const wss = new WebSocket.Server({server})

wss.on('connection', function connection(ws){

    // const userId = 

    ws.on('message', function incoming(data, isBinary){

        wss.clients.forEach(async function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                console.log(data);
                // const pool = await mssql.connect(sqlConfig)

                // const result = (await pool.request()
                // .input('data', data)
                // .input('isBinary', isBinary)
                // .execute('insertChats')).rowsAffected

                // console.log(result);
                
                
                client.send(data, {binary: isBinary})
            }
        })
    })
})

server.listen(3501, ()=>{
    console.log('websocket server running on port 3501'); 
})


app.use(json());
app.use(cors());

app.use('/industry', industryRouter)
app.use('/talent', talentRouter)
app.use('/employer', employerRouter)
app.use('/auth', authRouter)
app.use('/job', jobsRouter)

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