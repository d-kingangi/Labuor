import { Request, Response } from "express";
import { createEmployer, getSingleEmployer, getAllEmployers } from "../employer.controller";

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