import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
})
export class DialogWindowComponent implements OnInit {
  vis: boolean = false;

  @Input() header!: string;

  constructor() {}

  ngOnInit(): void {}

  show() {
    this.vis = true;
  }

  hide() {
    this.vis = false;
  }
}
