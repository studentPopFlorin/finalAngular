import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(credentials:any){
    
    return this.apiService.post("/login", credentials);
  }

  register(credentials:any){
    return this.apiService.post("/register", credentials);
  }
}
