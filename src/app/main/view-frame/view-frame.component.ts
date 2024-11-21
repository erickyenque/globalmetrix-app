import { Component, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-view-frame',
  templateUrl: './view-frame.component.html',
  styleUrls: ['./view-frame.component.scss'],
})
export class ViewFrameComponent  implements OnInit, OnChanges {

  iframeUrl!: SafeResourceUrl;

  constructor(
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private dataService: DataService<any>
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
  }

}
