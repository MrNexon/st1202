import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from './type/user.type';
import { Observable } from 'rxjs';
import { UserUploadTypeEnum } from './user-upload-type.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  user(): Observable<Omit<User, 'password'>> {
    return this.httpClient.get<Omit<User, 'password'>>(
      `${environment.apiUrl}/user/get`
    );
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/user/count`);
  }

  unlock(type: string): Observable<object> {
    return this.httpClient.get<object>(
      `${environment.apiUrl}/user/unlock/${type}`
    );
  }

  upload(type: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(
      `${environment.apiUrl}/user/upload/${type}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
