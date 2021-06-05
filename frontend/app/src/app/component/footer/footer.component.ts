import { Component, Input, OnInit } from '@angular/core';
import { SocialDto } from '../../api/social/social.dto';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() footerLogo!: string;
  @Input() footerDescription!: string;

  @Input() social?: SocialDto[];

  constructor() {}

  ngOnInit(): void {}
}
