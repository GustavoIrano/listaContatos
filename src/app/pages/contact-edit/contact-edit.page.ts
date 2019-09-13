import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.page.html',
  styleUrls: ['./contact-edit.page.scss'],
})
export class ContactEditPage implements OnInit {
  public form: FormGroup;
  public formAddress: FormGroup;
  public contact: Contact;

  constructor(
    private fb: FormBuilder,
    private fbA: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { 
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      address : ['']
    });
    this.formAddress = this.fbA.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");

    this.contactService.getContact(id)
      .subscribe(
        (res: any) => { 
          console.log(res); 
          this.contact = res;
          console.log(this.contact);
        },
        (err) => { }
      );
  }

  submit(){
    this.form.controls['address'].setValue(this.formAddress.value);
    console.log( this.form.value);
    this.contactService.saveContact(false, this.form.value)
    .subscribe(
      (res: any) => {
        this.showMessage(res.message);
        this.navCtrl.navigateRoot('/');
      },
      (err: any) => {}
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
