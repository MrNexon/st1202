import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements ControlValueAccessor {
  @Input() icon?: string;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder?: string;

  @Input() value?: string;

  onChange(_: any) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }
}
