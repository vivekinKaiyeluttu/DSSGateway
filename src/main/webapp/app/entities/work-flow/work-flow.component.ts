import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkFlow } from 'app/shared/model/work-flow.model';
import { WorkFlowService } from './work-flow.service';
import { WorkFlowDeleteDialogComponent } from './work-flow-delete-dialog.component';

@Component({
  selector: 'jhi-work-flow',
  templateUrl: './work-flow.component.html'
})
export class WorkFlowComponent implements OnInit, OnDestroy {
  workFlows?: IWorkFlow[];
  eventSubscriber?: Subscription;

  constructor(protected workFlowService: WorkFlowService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.workFlowService.query().subscribe((res: HttpResponse<IWorkFlow[]>) => {
      this.workFlows = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWorkFlows();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWorkFlow): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWorkFlows(): void {
    this.eventSubscriber = this.eventManager.subscribe('workFlowListModification', () => this.loadAll());
  }

  delete(workFlow: IWorkFlow): void {
    const modalRef = this.modalService.open(WorkFlowDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workFlow = workFlow;
  }
}
