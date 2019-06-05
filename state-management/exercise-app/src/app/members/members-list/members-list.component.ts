import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MemberWithRating } from 'src/app/data/model';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent {
  @Input() members: MemberWithRating[];

  @Output() click = new EventEmitter<number>();

  onClick(id: number) {
    this.click.emit(id);
  }
}
