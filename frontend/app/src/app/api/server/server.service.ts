import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerPublicInterface } from './interface/server-public.interface';
import { Observable } from 'rxjs';
import { SocialDto } from '../social/social.dto';
import { Server } from './type/server.type';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<ServerPublicInterface[]> {
    return this.httpClient.get<ServerPublicInterface[]>(
      `${environment.apiUrl}/server/list`
    );
  }

  getAll() {
    return this.httpClient.get<Server[]>(`${environment.apiUrl}/server/get`);
  }

  delete(id: number): Observable<Server> {
    return this.httpClient.get<Server>(
      `${environment.apiUrl}/server/delete/${id}`
    );
  }

  update(data: Server[]) {
    return this.httpClient.post<object>(
      `${environment.apiUrl}/server/update`,
      data
    );
  }
}
