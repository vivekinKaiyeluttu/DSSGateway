import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { RolePermissionMappingService } from './role-permission-mapping.service';

@Component({
  templateUrl: './role-permission-mapping-delete-dialog.component.html'
})
export class RolePermissionMappingDeleteDialogComponent {
  rolePermissionMapping?: IRolePermissionMapping;

  constructor(
    protected rolePermissionMappingService: RolePermissionMappingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolePermissionMappingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rolePermissionMappingListModification');
      this.activeModal.close();
    });
  }
}
