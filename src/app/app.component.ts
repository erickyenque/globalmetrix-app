import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public groups: any[] = [];
  public showMenu = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private dataService: DataService<any>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.viewMenu();
    this.dataService.getData().subscribe((data: any) => this.groups = data);
  }

  viewMenu() {
    this.router.events.subscribe(() => {
      this.showMenu = !this.router.url.includes('/login');
    });
  }

  async redirectToFrame(menu: any) {
    await this.storageService.setItem('menu_active', menu);
    this.router.navigate(['/view-frame']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
