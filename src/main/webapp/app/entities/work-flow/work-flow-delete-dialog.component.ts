import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkFlow } from 'app/shared/model/work-flow.model';
import { WorkFlowService } from './work-flow.service';

@Component({
  templateUrl: './work-flow-delete-dialog.component.html'
})
export class WorkFlowDeleteDialogComponent {
  workFlow?: IWorkFlow;

  constructor(protected workFlowService: WorkFlowService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workFlowService.delete(id).subscribe(() => {
      this.eventManager.broadcast('workFlowListModification');
      this.activeModal.close();
    });
  }
}
