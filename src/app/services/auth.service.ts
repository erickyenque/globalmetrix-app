import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login(username: string, password: string) {
    return this.http.post(`${apiUrl}/mobile/login.php`, {
      usuario: username,
      password: password
    });
  }

  async logout() {
    await this.storageService.removeItem('data');
    await this.storageService.removeItem('menu_active'); 
  }

  async isLoggedIn(): Promise<boolean> {
    const data = await this.storageService.getItem('data');
    return !!data;
  }

  menu(clientId: number) {
    return this.http.post(`${apiUrl}/mobile/menu.php`, {
      id_cliente: clientId
    });
  }
}
