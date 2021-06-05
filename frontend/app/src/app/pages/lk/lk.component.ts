import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from '../../api/auth/auth.service';
import { User } from '../../api/user/type/user.type';
import { UserService } from '../../api/user/user.service';
import * as dateFormat from 'dateformat';
import { UserUploadTypeEnum } from '../../api/user/user-upload-type.enum';
import { HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { SkinViewerComponent } from '../../component/skin-viewer/skin-viewer.component';
import { ContentService } from '../../api/content/content.service';
import { SocialService } from '../../api/social/social.service';
import { SocialDto } from '../../api/social/social.dto';
import { DialogWindowComponent } from '../../component/dialog-window/dialog-window.component';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss'],
})
export class LkComponent implements OnInit {
  constructor(
    public router: Router,
    private userService: UserService,
    private authService: AuthService,
    private contentService: ContentService,
    private socialService: SocialService
  ) {}

  public user!: Omit<User, 'password'>;
  public createDate?: string;

  public skinUploadStatus: number | null = null;
  public hdSkinUploadStatus: number | null = null;
  public cloakUploadStatus: number | null = null;

  public validator: string | null = null;

  public pageData!: any;
  public socialList: SocialDto[] = [];

  @ViewChild('skinViewer')
  skinViewer!: SkinViewerComponent;

  @ViewChild('dialogHdSkin')
  dialogHdSkin!: DialogWindowComponent;

  @ViewChild('dialogCloak')
  dialogCloak!: DialogWindowComponent;

  @ViewChild('dialogError')
  dialogError!: DialogWindowComponent;

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLogin()) {
      await this.router.navigate(['login']);
      return;
    }

    this.contentService.get().subscribe((data) => {
      this.pageData = data;
      this.textVarHandler();
    });

    this.socialService.get().subscribe((data) => {
      this.socialList = data;
    });

    this.userService.user().subscribe(
      (user) => {
        this.user = user;
        this.createDate = dateFormat(user.create_timestamp, 'dd.mm.yyyy');
      },
      () => {
        this.authService.resetLogin();
        this.router.navigate(['login']);
      }
    );
  }

  textVarHandler() {
    Object.entries(this.pageData).forEach(([key, value]) => {
      let v = String(value).match(/{{(\w+)}}/gm);
      if (v) {
        v.forEach((val) => {
          let k = val.replace(/[{}]/gm, '');
          this.pageData[key] = String(value).replace(val, this.pageData[k]);
        });
      }
    });
  }

  validateUserAdd(type: string, event: any) {
    switch (type) {
      case 'hd_skin':
        if (!this.user.hd_skin_unlock) {
          this.dialogHdSkin.show();
          event.preventDefault();
          return;
        }
        break;
      case 'cloak':
        if (!this.user.cloak_unlock) {
          this.dialogCloak.show();
          event.preventDefault();
          return;
        }
        break;
    }
  }

  buyAction(type: string) {
    this.userService.unlock(type).subscribe(
      async () => {
        await this.ngOnInit();
        this.dialogHdSkin.hide();
        this.dialogCloak.hide();
        this.dialogError.hide();
      },
      () => {
        this.dialogError.show();
      }
    );
  }

  async fileUploader(
    type: string,
    file: File,
    progress: (value: number) => void,
    success: () => void,
    e: (data: string) => void
  ) {
    const upload = this.userService.upload(type, file);
    upload
      .pipe(
        finalize(() => {
          success();
          this.skinViewer.reloadSkinViewer();
        })
      )
      .subscribe(
        (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            if (event.total)
              progress(Math.round(100 * (event.loaded / event.total)));
          }
        },
        (error) => e(error.error.message)
      );
  }

  async onInputFile(type: string, event: any) {
    this.validator = null;

    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    const file: File | null = target.files.item(0);

    if (file) {
      await this.fileUploader(
        type,
        file,
        (value: number) => {
          switch (type) {
            case UserUploadTypeEnum.SKIN:
              this.skinUploadStatus = value;
              break;
            case UserUploadTypeEnum.HD_SKIN:
              this.hdSkinUploadStatus = value;
              break;
            case UserUploadTypeEnum.CLOAK:
              this.cloakUploadStatus = value;
              break;
          }
        },
        () => {
          switch (type) {
            case UserUploadTypeEnum.SKIN:
              this.skinUploadStatus = null;
              break;
            case UserUploadTypeEnum.HD_SKIN:
              this.hdSkinUploadStatus = null;
              break;
            case UserUploadTypeEnum.CLOAK:
              this.cloakUploadStatus = null;
              break;
          }
        },
        (error) => {
          this.validator = error;
        }
      );
    }
  }
}
