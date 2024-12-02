import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService,
    private channelService: ChannelService
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
      this.loadingService.present();
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: async (response: any) => {          
          const { data } = response;
          await this.storageService.setItem('data', data);
          this.channelService.sendDataToChannel('getMenu', data);
          this.form.reset();
          this.loadingService.dismiss();
          this.router.navigate(['/home']);
          this.presentToast(response.message);
        },
        error: async (error) => {
          this.loadingService.dismiss();
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
