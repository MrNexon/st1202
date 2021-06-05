import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../api/content/content.service';
import { ServerService } from '../../api/server/server.service';
import { SocialDto } from '../../api/social/social.dto';
import { Server } from '../../api/server/type/server.type';

@Component({
  selector: 'app-admin-servers',
  templateUrl: './admin-severs.component.html',
  styleUrls: ['./admin-severs.component.scss'],
})
export class AdminServersComponent implements OnInit {
  constructor(private serverService: ServerService) {}

  public contentData: Server[] = [];
  public dataUpdate: boolean = false;

  ngOnInit(): void {
    this.serverService.getAll().subscribe((data) => {
      this.contentData = data;
    });
  }

  add() {
    this.contentData.push({
      id: -1,
      name: '',
      description: '',
      stat_url: '',
      slots: 0,
      online: 0,
      icon_src: '',
    });
  }

  update() {
    this.dataUpdate = true;
    this.serverService.update(this.contentData).subscribe(() => {
      this.dataUpdate = false;
    });
  }

  cancel() {
    this.contentData = [];
    this.ngOnInit();
  }

  delete(id: number) {
    if (id === -1) {
      this.ngOnInit();
      return;
    }
    this.serverService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
