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
import {Server} from 'socket.io'
import messageRouter from './Routes/messages.routes';
import applicationRouter from './Routes/applications.routes';
import reviewRouter from './Routes/review.routes';

const multer  = require('multer')

const app = express();
dotenv.config();

// websockets
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET", "POST", "DELETE", "PUT"]
    }
});

app.use(json());
app.use(cors());

app.use('/industry', industryRouter)
app.use('/talent', talentRouter)
app.use('/employer', employerRouter)
app.use('/auth', authRouter)
app.use('/job', jobsRouter)
app.use('/message', messageRouter)
app.use('/application', applicationRouter)
app.use('/review', reviewRouter)



io.on('connection', (socket) => {
    console.log('client connected', socket.id);

    socket.on('message', (message) => {
        console.log('Received message: ', message);
        
        socket.broadcast.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('client disconnected', socket.id);        
    })
    
})

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

export { io };