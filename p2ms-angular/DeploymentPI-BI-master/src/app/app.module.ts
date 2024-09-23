import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManagerComponent } from './components/manager/manager.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleDashboardComponent } from './components/article-dashboard/article-dashboard.component';
import { FournisseurDashboardComponent } from './components/fournisseur-dashboard/fournisseur-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { PredictionComponent } from './components/prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,           // Declared once
    LoginComponent,            // Declared once
    ManagerComponent,
    OverviewComponent,
    ClientDashboardComponent,
    FournisseurDashboardComponent,
    ArticleDashboardComponent,
    SignUpComponent,
    HeaderComponent,
    PredictionComponent            // Correct capitalization and declared once
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
