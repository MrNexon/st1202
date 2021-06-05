import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-big-counter',
  templateUrl: './big-counter.component.html',
  styleUrls: ['./big-counter.component.scss']
})
export class BigCounterComponent {
  @Input() value!: string;

}
