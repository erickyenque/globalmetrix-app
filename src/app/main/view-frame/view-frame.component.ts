import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-view-frame',
  templateUrl: './view-frame.component.html',
  styleUrls: ['./view-frame.component.scss'],
})
export class ViewFrameComponent  implements OnInit {

  iframeUrl!: SafeResourceUrl;

  constructor(
    private storageService: StorageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getMenuActive();
  }

  async getMenuActive() {
    const menuActive = await this.storageService.getItem('menu_active');
    this.sanitize(menuActive.url);
  }

  sanitize(url: string) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
