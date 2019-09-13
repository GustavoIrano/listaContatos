import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { UserService } from 'src/app/services/user.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceUser: UserService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, CustomValidator.EmailValidator])],
      cpf: ['', Validators.compose([Validators.required, CustomValidator.isCpf])],
      phone: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  submit(){
    this.serviceUser.addUser(this.form.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.showMessage(res.message);
          this.navCtrl.navigateRoot('/login');
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
