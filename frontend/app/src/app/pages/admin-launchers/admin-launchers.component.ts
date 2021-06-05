import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../api/content/content.service';
import { ServerService } from '../../api/server/server.service';
import { SocialService } from '../../api/social/social.service';
import { SocialDto } from '../../api/social/social.dto';
import { LauncherDto } from '../../api/launcher/launcher.dto';
import { LauncherService } from '../../api/launcher/launcher.service';

@Component({
  selector: 'app-admin-servers',
  templateUrl: './admin-launchers.component.html',
  styleUrls: ['./admin-launchers.component.scss'],
})
export class AdminLaunchersComponent implements OnInit {
  constructor(private launcherService: LauncherService) {}

  public launcherList: LauncherDto[] = [];
  public dataUpdate: boolean = false;

  ngOnInit(): void {
    this.launcherService.getAll().subscribe((data) => {
      this.launcherList = data;
    });
  }

  update() {
    this.dataUpdate = true;
    this.launcherService.update(this.launcherList).subscribe(() => {
      this.dataUpdate = false;
    });
  }

  cancel() {
    this.launcherList = [];
    this.ngOnInit();
  }
}
