import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: Contact[] = [];
  
  constructor(
    private service: ContactService
  ) {}

  ngOnInit(){
    this.service.getContacts()
      .subscribe(
        (res: any) => {
          this.contacts = res;
        }
      );
  }

}
