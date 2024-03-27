import { TestBed } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { expectedTalents } from './testdata/talent.register';
import { expectedEmployers } from './testdata/employer.register';
import { expectedJobs } from './testdata/job.register';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
    testingController = TestBed.inject(HttpTestingController);
  });

  // talent service test

  it('Should get all talents', () => {
    service.getAllTalents().subscribe((res) => {
      expect(res.talents).toEqual(expectedTalents);
    })

    const mockReq = testingController.expectOne('http://localhost:3000/talent');
    mockReq.flush(Object.values(expectedTalents));
    expect(mockReq.request.method).toEqual('GET');
  })

  it('should get talent by Id', () => {
    let talentId = '123';

    service.getSingleTalent(talentId).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.talent[0].email).toBe('')
    })

    const mockReq = testingController.expectOne('http://localhost:3000/talent/:talentId');
    mockReq.flush(expectedTalents[0]);
    expect(mockReq.request.method).toEqual('GET');
  })

  // employer service test

  it('Should get all employers', () => {
    service.getAllEmployers().subscribe((res) => {
      expect(res.employers).toEqual(expectedEmployers);
    })

    const mockReq = testingController.expectOne('http://localhost:3000/employer');
    mockReq.flush(Object.values(expectedEmployers));
    expect(mockReq.request.method).toEqual('GET');
  })

  it('should get employer by Id', () => {
    service.getSingleEmployer('123').subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.employer[0].email).toBe('abccompany@gmail.com')
    })

    const mockReq = testingController.expectOne('http://localhost:3000/employer/:employerId');
    mockReq.flush(expectedEmployers[0]);
    expect(mockReq.request.method).toEqual('GET');
  })

  it('Should get employers by industry', () => {
    service.getEmployersByIndustry('1').subscribe((res) => {
      expect(res.employers).toEqual(expectedEmployers);
    })

    const mockReq = testingController.expectOne('http://localhost:3000/employer/industry/:industryId');
    mockReq.flush(Object.values(expectedEmployers));
    expect(mockReq.request.method).toEqual('GET');
  })


  // job service tests

  it('Should get all jobs', () => {
    service.getEveryJob().subscribe((res) => {
      expect(res.jobs).toEqual(expectedJobs);
    })

    const mockReq = testingController.expectOne('http://localhost:3000/job');
    mockReq.flush(Object.values(expectedJobs));
    expect(mockReq.request.method).toEqual('GET');

  })


  it('should get job by employerId', ()=>{
    service.getJobsByEmployer('orgI23').subscribe((res)=>{
      expect(res).toBeTruthy();
      expect(res.jobs).toEqual(expectedJobs)
    })

    const mockReq = testingController.expectOne('http://localhost:3000/job/orgId')
    mockReq.flush(Object.values(expectedJobs))
    expect(mockReq.request.method).toEqual('GET');
  })


  it('should get job by id', ()=>{
    service.getSingleJob('job123').subscribe((res)=>{
      expect(res).toBeTruthy()
      expect(res.job[0].jobId).toBe('job123')
    })

    const mockReq = testingController.expectOne('http://localhost:3000/job/:jobId')
    mockReq.flush(expectedJobs[0])
    expect(mockReq.request.method).toEqual('GET')
  })
});


