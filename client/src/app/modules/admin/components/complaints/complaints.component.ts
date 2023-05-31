import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent {
  complaints: any[] = []
  agents: any[] = []
  agent: string = ''

  constructor(private http: HttpClient) {
    this.http.get<any[]>(`http://localhost:5100/complaints`).subscribe((res) => {
      this.complaints = res
    })

    this.http.get<any[]>(`http://localhost:5100/agents`).subscribe((res:any[]) => {
      const response = res.filter((user) => user.type === 'agent')
      this.agents = response
    })
  }

  onSubmitStatus(id: string, status: string) {
    console.log(status)
    this.http.put(`http://localhost:5100/complaints/${id}/update-status`, {status:status}).subscribe((res) => {
      this.http.get<any[]>(`http://localhost:5100/complaints`).subscribe((res) => {
        this.complaints = res
      })
    })
  }

  onAssign(userId:string,agent:string){
    console.log(agent,userId)
    this.agent = ""
  }
}
