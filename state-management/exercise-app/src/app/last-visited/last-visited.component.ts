import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Member } from '../data/model';

@Component({
  selector: 'app-last-visited',
  templateUrl: './last-visited.component.html',
  styleUrls: ['./last-visited.component.css']
})
export class LastVisitedComponent {
  @Input() members: Member[];

  @Output() click = new EventEmitter<number>();

  onClick(id: number) {
    this.click.emit(id);
  }
}
