import {Component, Input} from '@angular/core';
import {ServerPublicInterface} from '../../api/server/interface/server-public.interface';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss']
})
export class ServerCardComponent {
  @Input() orientation!: string;
  @Input() server!: ServerPublicInterface;
}
