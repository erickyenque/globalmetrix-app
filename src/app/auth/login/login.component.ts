import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: async (response: any) => {
          this.form.reset();
          this.isLoading = false;
          this.presentToast(response.message);
        },
        error: async (error) => {
          this.isLoading = false;
          const { message } = error.error;
          this.presentToast(message);
        }
      })
    }
  }

  //Crear toast generico
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
