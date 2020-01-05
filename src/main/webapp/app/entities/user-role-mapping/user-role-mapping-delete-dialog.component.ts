import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { UserRoleMappingService } from './user-role-mapping.service';

@Component({
  templateUrl: './user-role-mapping-delete-dialog.component.html'
})
export class UserRoleMappingDeleteDialogComponent {
  userRoleMapping?: IUserRoleMapping;

  constructor(
    protected userRoleMappingService: UserRoleMappingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userRoleMappingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userRoleMappingListModification');
      this.activeModal.close();
    });
  }
}
