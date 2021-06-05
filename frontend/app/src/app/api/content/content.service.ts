import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<object> {
    return this.httpClient.get<object>(`${environment.apiUrl}/content/get`);
  }

  update(data: any) {
    return this.httpClient.post<object>(
      `${environment.apiUrl}/content/update`,
      data
    );
  }
}
