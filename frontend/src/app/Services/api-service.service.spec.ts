import { TestBed } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
