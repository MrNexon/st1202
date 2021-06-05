import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthLoginInterface } from './interface/auth-login.interface';
import { AuthLoginResponseInterface } from './interface/auth-login.response.interface';
import { User } from '../user/type/user.type';
import { environment } from '../../../environments/environment';
import { AuthRegInterface } from './interface/auth-reg.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(body: AuthLoginInterface): Promise<string | boolean> {
    return new Promise<string | boolean>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/auth/login`, body).subscribe(
        async (res: object) => {
          const data = res as AuthLoginResponseInterface;

          localStorage.setItem('access_token', data.access_token);

          await this.router.navigate(['lk']);

          resolve(true);
        },
        (error) => {
          reject(error.error.message);
        }
      );
    });
  }

  reg(body: AuthRegInterface): Promise<string | boolean> {
    return new Promise<string | boolean>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/auth/reg`, body).subscribe(
        async (res: object) => {
          const data = res as AuthLoginResponseInterface;

          //localStorage.setItem('access_token', data.access_token);

          await this.router.navigate(['login']);

          resolve(true);
        },
        (error) => {
          reject(error.error.message);
        }
      );
    });
  }

  public isLogin(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public get token() {
    return localStorage.getItem('access_token');
  }

  public resetLogin() {
    localStorage.removeItem('access_token');
  }
}
