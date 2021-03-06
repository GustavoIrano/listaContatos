import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private service: UserService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this.service.auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showMessage('Usuário ou senha inválidos');
        },
      );
  }

  async showSuccess(user) {
    UserUtil.set(user);
    this.navCtrl.navigateRoot('/');
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

  resetPassword(){
    this.service.resetPassword(this.form.value)
      .subscribe(
        (res: any) => {
          this.showMessage(res.message);
        },
        (err) => {}
      );
  }
}
