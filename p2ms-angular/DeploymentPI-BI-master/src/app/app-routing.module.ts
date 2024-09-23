import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ArticleDashboardComponent } from './components/article-dashboard/article-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { FournisseurDashboardComponent } from './components/fournisseur-dashboard/fournisseur-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { PredictionComponent } from './components/prediction/prediction.component';

const routes: Routes = [{path:'',component:LoginComponent},
{path:'fournisseur',component:FournisseurDashboardComponent},
{path:'article',component:ArticleDashboardComponent},
{path:'manager',component:OverviewComponent},
{path:'client',component:ClientDashboardComponent},
{path:'overview',component:OverviewComponent},
{path:'signup',component:SignUpComponent},
{path:'login',component:LoginComponent},
{path: 'prediction',component:PredictionComponent},
{path:'**',component:OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
