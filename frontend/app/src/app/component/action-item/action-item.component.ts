import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss']
})
export class ActionItemComponent implements OnInit {
  @Input() header!: string;
  @Input() icon!: string;
  @Input() color!: string;
  @Input() actionText!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
