import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {
  private dashboardChangeSource = new Subject<string>();
  dashboardChange$ = this.dashboardChangeSource.asObservable();
  constructor() { }
  emitDashboardChange(dashboard: string) {
    this.dashboardChangeSource.next(dashboard);
  }}
