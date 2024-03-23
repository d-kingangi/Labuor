import { Request, Response } from 'express';
import { createJob, getSingleJob, } from '../jobs.controller';

describe('Job Controller', () => {
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


    it('should create a job', async () => {
        mockRequest.body = {
            jobname: 'Scraping',
            orgId: '123',
            industryId: '123',
            description: 'Scraping data from websites',
            duration: '1 week',
            startdate: new Date(),
            salary: 1000,
            talentId: '123'
        }

        await createJob(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Job created successfully' });
    })
})