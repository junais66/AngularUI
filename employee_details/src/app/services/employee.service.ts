import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { ApiConfig } from '../config/api-config'
import { environment } from '../../environments/environment'
import { Employee } from '../shared/employeemodel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private api: ApiConfig ) { }
  
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Employee/GetDashboardData`);
  }
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Employee/GetAllEmployee`);
  }
  saveEmployeeData(employeeData: Employee): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Employee/SaveEmployeeDetails`, employeeData);
  }
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Employee/${employee.id}`, employee);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Employee/${id}`);
  }
}
