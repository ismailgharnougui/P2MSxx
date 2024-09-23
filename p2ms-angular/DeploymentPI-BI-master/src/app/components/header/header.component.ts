import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { DashboardCommunicationService } from '../dashboardcommunication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole: string | null = ''; // Set initial value as null or empty string
  currentRoute: string = ''; // Track the current route
  private userRoleSubscription!: Subscription;
  private routeSubscription!: Subscription;

  constructor(
    private adminService: AdminService,
    private dashboardCommunicationService: DashboardCommunicationService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the userRole$ observable
    this.userRoleSubscription = this.adminService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    // Subscribe to router events to track the current route
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  onLogout(): void {
    this.adminService.setUserRole(null); // Clear user role on logout
    this.userRole = null; // Reset local userRole variable
    this.router.navigate(['/login']); // Redirect to login page
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions to prevent memory leaks
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
