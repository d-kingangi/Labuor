import { Request, Response } from "express";
import { createEmployer, getSingleEmployer, getAllEmployers } from "../employer.controller";
import mssql from 'mssql';
import bcrypt from 'bcrypt';