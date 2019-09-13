import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  getContacts() {
    return this.http.get(`${environment.apiUrl}contacts`);
  }

  saveContact(isNew: boolean, contact: Contact) {
    if (isNew)
      return this.http.post('http://localhost:3000/contact', contact);

    return this.http.put(`http://localhost:3000/contact/${contact.id}`, contact);
  }

  getContact(id: string){
    return this.http.get(`http://localhost:3000/contact/${id}`);
  }

  deleteContact(id: string){
    return this.http.delete(`http://localhost:3000/contact/${id}`);
  }
}
