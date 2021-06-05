import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  createOrbitControls,
  RotatingAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-skin-viewer',
  templateUrl: './skin-viewer.component.html',
  styleUrls: ['./skin-viewer.component.scss'],
})
export class SkinViewerComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  skinContainer!: ElementRef<HTMLCanvasElement>;

  @Input() username?: string;

  skinViewer!: SkinViewer;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.skinViewer = new SkinViewer({
      canvas: this.skinContainer.nativeElement,
      width: 320,
      height: 380,
      skin: `${environment.apiUrl}/user/${
        this.username
      }/skin/${new Date().getTime()}`,
      cape: `${environment.apiUrl}/user/${
        this.username
      }/cloak/${new Date().getTime()}`,
    });

    this.skinViewer.animations.add(WalkingAnimation);
    this.skinViewer.animations.add(RotatingAnimation);

    this.skinViewer.animations.speed = 0.4;

    let control = createOrbitControls(this.skinViewer);
    control.enablePan = false;
    control.enableZoom = false;
    control.enableRotate = true;
  }

  public async reloadSkinViewer() {
    await this.skinViewer.loadSkin(
      `${environment.apiUrl}/user/${this.username}/skin/${new Date().getTime()}`
    );
    await this.skinViewer.loadCape(
      `${environment.apiUrl}/user/${
        this.username
      }/cloak/${new Date().getTime()}`
    );
  }
}
