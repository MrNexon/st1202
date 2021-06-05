import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../api/content/content.service';
import { ServerService } from '../../api/server/server.service';
import { SocialService } from '../../api/social/social.service';
import { SocialDto } from '../../api/social/social.dto';

@Component({
  selector: 'app-admin-servers',
  templateUrl: './admin-social.component.html',
  styleUrls: ['./admin-social.component.scss'],
})
export class AdminSocialComponent implements OnInit {
  constructor(private socialService: SocialService) {}

  public socialList: SocialDto[] = [];
  public dataUpdate: boolean = false;

  ngOnInit(): void {
    this.socialService.get().subscribe((data) => {
      this.socialList = data;
    });
  }

  add() {
    this.socialList.push({
      id: -1,
      type: 'vk',
      header: '',
      button_text: '',
      link: '',
      display_block: false,
      display_footer: false,
    });
  }

  update() {
    this.dataUpdate = true;
    this.socialService.update(this.socialList).subscribe(() => {
      this.dataUpdate = false;
    });
  }

  cancel() {
    this.socialList = [];
    this.ngOnInit();
  }

  delete(id: number) {
    if (id === -1) {
      this.ngOnInit();
      return;
    }
    this.socialService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
