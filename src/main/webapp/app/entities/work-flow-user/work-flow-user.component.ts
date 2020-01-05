import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { WorkFlowUserService } from './work-flow-user.service';
import { WorkFlowUserDeleteDialogComponent } from './work-flow-user-delete-dialog.component';

@Component({
  selector: 'jhi-work-flow-user',
  templateUrl: './work-flow-user.component.html'
})
export class WorkFlowUserComponent implements OnInit, OnDestroy {
  workFlowUsers?: IWorkFlowUser[];
  eventSubscriber?: Subscription;

  constructor(
    protected workFlowUserService: WorkFlowUserService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.workFlowUserService.query().subscribe((res: HttpResponse<IWorkFlowUser[]>) => {
      this.workFlowUsers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWorkFlowUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWorkFlowUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWorkFlowUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('workFlowUserListModification', () => this.loadAll());
  }

  delete(workFlowUser: IWorkFlowUser): void {
    const modalRef = this.modalService.open(WorkFlowUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workFlowUser = workFlowUser;
  }
}
