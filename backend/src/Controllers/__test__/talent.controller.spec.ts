// talents.controller.test.ts

import { Request, Response } from 'express';
import { createTalent, getAllTalents, getSingleTalent, getTalentsPerIndustry, updateTalent, deleteTalent } from '../talent.controller';

describe('Talents Controller', () => {
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

  it('should create a talent', async () => {
    mockRequest.body = { 
      profileImg: 'image.jpg',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      industryId: '123',
      speciality: 'Developer',
      talentWallet: 'wallet123',
      location: 'City',
      phone: '1234567890',
      password: 'password123'
    };

    await createTalent(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Account created successfully' });
  });

  it('should get all talents', async () => {
    await getAllTalents(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

});