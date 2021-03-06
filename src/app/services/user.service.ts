import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}accounts/authenticate`, data);
  }

  addUser(user: any){
    return this.http.post(`${environment.apiUrl}addUser`, user);
  }

  resetPassword(email: string){
    return this.http.post(`${environment.apiUrl}resetPassword`, email);
  }
}
