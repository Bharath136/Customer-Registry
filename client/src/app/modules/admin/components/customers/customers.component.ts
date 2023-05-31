import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any[] = []
  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:5100/users').subscribe((res) => {
      this.customers = res
    });
  }
}
