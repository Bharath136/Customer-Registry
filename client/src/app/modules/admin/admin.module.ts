import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgentsComponent } from './components/agents/agents.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddAgentComponent } from './components/add-agent/add-agent.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AgentsComponent,
    ComplaintsComponent,
    SidebarComponent,
    AddAgentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
