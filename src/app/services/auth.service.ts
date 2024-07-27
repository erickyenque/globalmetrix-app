import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost/globalmetrix/system/mobile/login.php', {
      usuario: username,
      password: password
    });
  }
}
