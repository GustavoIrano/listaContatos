import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  
  constructor(
    private contactService: ContactService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  deleteContact(id: string){
    this.contactService.deleteContact(id)
      .subscribe(
        (res: any) => {
          this.showMessage(res.message);
        },
        (err) => {}
      );
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
    });
    toast.present();
  }
}
