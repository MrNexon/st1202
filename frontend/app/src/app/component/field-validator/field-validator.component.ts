import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-field-validator',
  templateUrl: './field-validator.component.html',
  styleUrls: ['./field-validator.component.scss']
})
export class FieldValidatorComponent implements OnInit {
  @Input() show = false;

  constructor() { }

  ngOnInit(): void {
  }

}
