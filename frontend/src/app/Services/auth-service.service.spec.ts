import { TestBed } from '@angular/core/testing';
import { AuthServiceService } from './auth-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthServiceService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register talent', () => {
    let mockTalent = {
      UserType: 'talent',
      talentId: '123',
      profileImg: 'img',
      firstname: 'first',
      lastname: 'last',
      email: 'email',
      industryId: '123',
      speciality: 'special',
      talentWallet: '123',
      location: 'location',
      phone: 'phone',
      password: 'password'
    };

    service.registerTalent(mockTalent).subscribe((response) => {
      expect(response).toEqual('Account created successfully');
    });

    const mockReq = testingController.expectOne('http://localhost:3000/talent');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockTalent);
    mockReq.flush({message: 'Account created successfully'});
  })


  it('logs in a user', () => {
    let mockUser = {
      email: 'email@email.com',
      password: 'password'
    }
    
    service.loginUser(mockUser).subscribe((res) => {
      expect(res.message).toEqual('Logged in successfully');
    })

    const mockReq = testingController.expectOne('http://localhost:3000/auth/login');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockUser);
    mockReq.flush({message: 'Logged in successfully'});
  })

  
});
