import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-info',
  templateUrl: './social-info.component.html',
  styleUrls: ['./social-info.component.scss'],
})
export class SocialInfoComponent implements OnInit {
  @Input() header!: string;
  @Input() button_text!: string;
  @Input() link!: string;

  constructor() {}

  ngOnInit(): void {}
}
