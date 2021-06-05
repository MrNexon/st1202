import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LauncherDto } from './launcher.dto';
@Injectable({
  providedIn: 'root',
})
export class LauncherService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<LauncherDto[]> {
    return this.httpClient.get<LauncherDto[]>(
      `${environment.apiUrl}/launcher/get`
    );
  }

  getAll(): Observable<LauncherDto[]> {
    return this.httpClient.get<LauncherDto[]>(
      `${environment.apiUrl}/launcher/getAll`
    );
  }

  update(data: LauncherDto[]) {
    return this.httpClient.post<object>(
      `${environment.apiUrl}/launcher/update`,
      data
    );
  }
}
