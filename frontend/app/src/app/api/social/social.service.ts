import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SocialDto } from './social.dto';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<SocialDto[]> {
    return this.httpClient.get<SocialDto[]>(`${environment.apiUrl}/social/get`);
  }

  delete(id: number): Observable<SocialDto> {
    return this.httpClient.get<SocialDto>(
      `${environment.apiUrl}/social/delete/${id}`
    );
  }

  update(data: SocialDto[]) {
    return this.httpClient.post<object>(
      `${environment.apiUrl}/social/update`,
      data
    );
  }
}
