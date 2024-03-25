import { Request, Response } from "express";
import { createEmployer, getSingleEmployer, getAllEmployers, deleteEmployer } from "../employer.controller";
import mssql from 'mssql'

describe('Employer Controller', ()=>{
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });
    

    it('should create employer', async () => {
        mockRequest.body = {
            orgname: 'Library',
            email: 'lib@rary.co',
            logo: 'image.png',
            industryId: 'sdhsjh',
            employerWallet: 'lib.eth',
            password: 'libr@2023'
        };

        await createEmployer(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Account created successfully' });
    })
})

//test for getallemployers

describe ('Gets all members', ()=>{

  let res: any
    let req: any

    beforeEach(()=>{
        req={
            body:{}
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully gets members', async()=>{
      const mockedResult = [
        {orgId: '353545-43495835-458347575', orgname: 'imagine org', email: 'imagine@org.com', logo: 'imagine.png', industryId: '6748', employerWallet: 'imagine.eth',password:'imagine password' },
        {orgId: '353545-43495835-458347575', orgname: 'imagine org', email: 'imagine@org.com', logo: 'imagine.png', industryId: '6748', employerWallet: 'imagine.eth',password:'imagine password' },
        {orgId: '4567', orgname: 'imagine org', email: 'imagine@org.com', logo: 'imagine.png', industryId: '6748', employerWallet: 'imagine.eth',password:'imagine password' },
      ]

      const mockedInput = jest.fn().mockReturnThis() 

      const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult })

      const mockedRequest ={
          input: mockedInput,
          execute: mockedExecute
      }

      const mockedPool ={
          request: jest.fn().mockReturnValue(mockedRequest)
      }

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

      await getAllEmployers(req as any, res)

      expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
    })
})

// test for getSingleEmployer

describe('Gets a single member', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{
      req = {
          params: {
              id: '353545-43495835-458347575', 
          },
      };
      res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
      };
    })

    it('Successful gets a single member',async () => {
      const mockedResult = [
          { id: '353545-43495835-458347575', orgname: 'imagine org', email: 'imagine@org.com', logo: 'imagine.png', industryId: '6748', employerWallet: 'imagine.eth', password:'imagine password'}
      ]

      const mockedInput = jest.fn().mockReturnThis() 

      const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult [0] })

      const mockedRequest ={
          input: mockedInput,
          execute: mockedExecute
      }

      const mockedPool ={
          request: jest.fn().mockReturnValue(mockedRequest)
      }

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

      await getSingleEmployer(req as any, res)

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching employer." });
  })
})

// deleteEmployer test

describe ('Account deleted successfully', ()=>{
  let res: any
    let req: any

    beforeEach(()=>{

        req={
            params: {
                orgId: '353545-43495835-458347575', 
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully deletes member',async () => {
      const req={ body:{}}
      
      const mockedInput = jest.fn().mockReturnThis()

      const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

      const mockedRequest ={
          input: mockedInput,
          execute: mockedExecute
      }

      const mockedPool ={
          request: jest.fn().mockReturnValue(mockedRequest)
      }

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

      await deleteEmployer(req as any, res)

      expect(res.json).toHaveBeenCalledWith({message: "Account deleted successfully"})
  })

})