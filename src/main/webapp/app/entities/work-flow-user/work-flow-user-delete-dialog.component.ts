import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { WorkFlowUserService } from './work-flow-user.service';

@Component({
  templateUrl: './work-flow-user-delete-dialog.component.html'
})
export class WorkFlowUserDeleteDialogComponent {
  workFlowUser?: IWorkFlowUser;

  constructor(
    protected workFlowUserService: WorkFlowUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workFlowUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('workFlowUserListModification');
      this.activeModal.close();
    });
  }
}
