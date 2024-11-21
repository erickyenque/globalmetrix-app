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
    this.getMenu();
    this.viewMenu();
  }

  viewMenu() {
    this.router.events.subscribe(() => {
      this.showMenu = !this.router.url.includes('/login');
    });
  }

  async redirectToFrame(menu: any) {
    await this.storageService.setItem('menu_active', menu);
    this.router.navigate(['/view-frame']);
    this.dataService.sendData(menu);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async getMenu() {
    const data = await this.storageService.getItem('data');
    const { id } = data;
    if (!id) return;
    this.authService.menu(id).subscribe({
      next: (response: any) => {        
        const { menu, grupos } = response;

        grupos.forEach((grupo: any) => {
          const menus = menu.filter((m: any) => m.id_grupo === grupo.id);
          grupo.menus = menus;
        })

        const menuSinGrupo = menu.filter((m: any) => !m.id_grupo);

        grupos.push({
          id: 0,
          nombre: 'OTROS',
          menus: menuSinGrupo
        });

        this.groups = grupos.map((g: any) => {
          return {
            id: g.id,
            title: g.nombre,
            value: g.nombre.toLowerCase().replace(' ', '-'),
            menus: g.menus.map((m: any) => {
              return {
                title: m.nombre,
                url: m.enlace,
                icon: 'archive'
              }
            })
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
