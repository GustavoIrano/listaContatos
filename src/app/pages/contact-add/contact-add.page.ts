import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.page.html',
  styleUrls: ['./contact-add.page.scss'],
})
export class ContactAddPage implements OnInit {
  public form: FormGroup;
  public formAddress: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fbA: FormBuilder,
    private contactService: ContactService,
    private toastCtrl: ToastController
  ) { 
    this.form = this.fb.group({
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
  }

  submit(){
    this.form.controls['address'].setValue(this.formAddress.value);
    console.log( this.form.value);
    this.contactService.saveContact(true, this.form.value)
    .subscribe(
      (res: any) => {
        this.showMessage(res.message);
        this.form.reset()
        this.formAddress.reset();
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
