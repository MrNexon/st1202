import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerPublicInterface } from '../../api/server/interface/server-public.interface';
import { ServerService } from '../../api/server/server.service';
import { UserService } from '../../api/user/user.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ContentService } from '../../api/content/content.service';
import { SkinViewerComponent } from '../../component/skin-viewer/skin-viewer.component';
import { DialogWindowComponent } from '../../component/dialog-window/dialog-window.component';
import { SocialService } from '../../api/social/social.service';
import { SocialDto } from '../../api/social/social.dto';
import { LauncherService } from '../../api/launcher/launcher.service';
import { LauncherDto } from '../../api/launcher/launcher.dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public serverList: ServerPublicInterface[] = [];
  public socialList: SocialDto[] = [];
  public launcherList: LauncherDto[] = [];
  public currentOnline: number = 0;
  public usersCount: number = 0;

  public pageData!: any;

  @ViewChild('dialog')
  dialogWindow!: DialogWindowComponent;

  constructor(
    private viewportScroller: ViewportScroller,
    private serverService: ServerService,
    private userService: UserService,
    private contentService: ContentService,
    private socialService: SocialService,
    private launcherService: LauncherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentService.get().subscribe((data) => {
      this.pageData = data;
    });

    this.launcherService.get().subscribe((data) => {
      this.launcherList = data;
    });

    this.socialService.get().subscribe((data) => {
      this.socialList = data;
    });

    this.serverService.list().subscribe((list) => {
      this.serverList = list;

      list.forEach((server) => {
        this.currentOnline += server.online;
      });
    });

    this.userService.count().subscribe((count) => (this.usersCount = count));
  }

  public anchorMove(anchorId: string): void {
    this.viewportScroller.scrollToAnchor(anchorId);
  }

  public async navigate(link: string): Promise<void> {
    await this.router.navigate([link]);
  }

  public showDialog() {
    this.dialogWindow.show();
  }
}
