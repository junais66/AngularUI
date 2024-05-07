import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  
 readonly apiBaseUrl: string = environment.apiBaseUrl;

  constructor() { 
  }
  
  GET_EMPLOYEE_COUNT = (): string => `${this.apiBaseUrl}/Employee`;
  
  GET_ACTIVE_EMPLOYEE_COUNT = (): string => `${this.apiBaseUrl}/Employee`;
  
}
