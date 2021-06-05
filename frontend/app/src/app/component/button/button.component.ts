import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() color: 'primary' | 'accent' | 'destructive' | 'positive' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  @Input() progressBar: boolean = false;
  @Input() progressValue: number = 0;
  @Input() progressMax: number = 100;

  @Input() size?: 's' | 'n' = 'n';

  constructor() {}

  ngOnInit(): void {}
}
