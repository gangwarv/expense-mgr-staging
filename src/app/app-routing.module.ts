import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CreateComponent } from './create/create.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'test',
    component: DashboardComponent
  },
  {
    path: 'create',
    component: AddBillComponent
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
