import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../api/content/content.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
})
export class AdminMainComponent implements OnInit {
  constructor(private contentService: ContentService) {}

  public contentData: any = null;
  public dataUpdate: boolean = false;

  ngOnInit(): void {
    this.contentService.get().subscribe((data) => {
      this.contentData = data;
    });
  }

  save() {
    this.dataUpdate = true;
    this.contentService.update(this.contentData).subscribe(() => {
      this.dataUpdate = false;
    });
  }

  cancel() {
    this.contentData = null;
    this.ngOnInit();
  }
}
