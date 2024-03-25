// import jwt from 'jsonwebtoken'
// import { Request, Response } from 'express'

// let mockRequest = () =>{
//     return {
//         headers:{
//             token: "valid_token_for_testing_dskjgjfls_fdsjgfdj_fjhggkfsakjh"
//         }
//     } 
// }

// let mockResponse = ()=>{
//     return{
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn().mockReturnThis()
//     }
    
// }

// let mockNext = jest.fn()

// describe('Testing this middleware', () => {
//     // let token: string;
//     // let talentToken: string;
//     // let employerToken: string;
  
//     beforeAll(() => {
//       const talentData: loginTalentDetails = {
//         talentId: 'talent123',
//         profileImg: 'talent.png',
//         firstname: 'Talent',
//         lastname: 'User',
//         email: 'talent@example.com',
//         industryId: '1',
//         speciality: 'Acting',
//         talentWallet: 'talentWallet',
//         location: 'New York',
//         phone: '123-456-7890',
//         password: 'talentpassword',
//       };
//       talentToken = jwt.sign(talentData, process.env.SECRET as string);
  
//       const employerData: loginEmployerDetails = {
//         orgId: 'employer123',
//         orgname: 'Employer Inc.',
//         email: 'employer@example.com',
//         logo: 'employer.png',
//         industryId: '2',
//         employerWallet: 'employerWallet',
//         password: 'employerpassword',
//       };
//       employerToken = jwt.sign(employerData, process.env.SECRET as string);
  
//       token = talentToken;
//     });
  
//     it('should return 401 if no token is provided', async () => {
//       const response = await request(app)
//         .post('/api/verifyToken')
//         .send({});
//       expect(response.status).toBe(401);
//       expect(response.body.message).toBe('You do not have access');
//     });
  
//     it('should return 403 if token is invalid', async () => {
//       const response = await request(app)
//         .post('/api/verifyToken')
//         .set('token', 'invalidtoken')
//         .send({});
//       expect(response.status).toBe(403);
//       expect(response.body.error).toBe('Forbidden: Invalid token');
//     });
  
//     it('should return 200 if token is valid', async () => {
//       const response = await request(app)
//         .post('/api/verifyToken')
//         .set('token', token)
//         .send({});
//       expect(response.status).toBe(200);
//     });
//   });