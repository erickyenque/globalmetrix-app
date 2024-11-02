import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public groups: any[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dataService: DataService<any>
  ) { }

  ngOnInit() {
    this.getMenu();
  }  

  async getMenu() {
    const data = await this.storageService.getItem('data');
    const { id } = data;
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

        this.dataService.sendData(this.groups);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
