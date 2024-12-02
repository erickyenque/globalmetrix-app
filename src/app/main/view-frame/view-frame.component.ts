import { Component, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-view-frame',
  templateUrl: './view-frame.component.html',
  styleUrls: ['./view-frame.component.scss'],
})
export class ViewFrameComponent implements OnInit, OnChanges {

  iframeUrl!: SafeResourceUrl;

  constructor(
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private dataService: DataService<any>,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getMenuActive();
    this.dataService.getData().subscribe((data) => {
      console.log(data);
      const { url } = data;
      this.sanitize(url);
    });
  }

  ngOnChanges() {
    console.log('changes');
  }

  async getMenuActive() {
    const menuActive = await this.storageService.getItem('menu_active');
    this.sanitize(menuActive.url);
  }

  sanitize(url: string) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (url.startsWith("https://web.eu.v-box.net/")) {
      this.lockOrientation(); // Bloquea en modo horizontal
      this.presentAlert();
    } else {
      this.unlockOrientation(); // Desbloquea para permitir orientación automática
    }
  }

  async lockOrientation() {
    try {
      await ScreenOrientation.lock({ orientation: 'landscape' });
      console.log('Orientación bloqueada en horizontal');
    } catch (error) {
      console.error('Error al bloquear orientación:', error);
    }
  }

  async unlockOrientation() {
    try {
      await ScreenOrientation.unlock();
      console.log('Orientación desbloqueada');
    } catch (error) {
      console.error('Error al desbloquear orientación:', error);
    }
  }

  async presentAlert() {
    const currentOrientation = await ScreenOrientation.orientation();

    if (currentOrientation.type !== 'landscape-primary' && currentOrientation.type !== 'landscape-secondary') {
      const alert = await this.alertController.create({
        header: 'Modo horizontal requerido',
        subHeader: 'Mejor experiencia',
        message: 'Por favor, cambia la orientación de tu pantalla a horizontal para una mejor visualización.',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }
  }
}
