import { TestBed } from '@angular/core/testing';

import { DashboardcommunicationService } from './dashboardcommunication.service';

describe('DashboardcommunicationService', () => {
  let service: DashboardcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
