import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'agents', component: AgentsComponent },
      { path: 'complaints', component: ComplaintsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
