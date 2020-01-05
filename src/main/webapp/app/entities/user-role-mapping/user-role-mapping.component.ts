import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { UserRoleMappingService } from './user-role-mapping.service';
import { UserRoleMappingDeleteDialogComponent } from './user-role-mapping-delete-dialog.component';

@Component({
  selector: 'jhi-user-role-mapping',
  templateUrl: './user-role-mapping.component.html'
})
export class UserRoleMappingComponent implements OnInit, OnDestroy {
  userRoleMappings?: IUserRoleMapping[];
  eventSubscriber?: Subscription;

  constructor(
    protected userRoleMappingService: UserRoleMappingService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userRoleMappingService.query().subscribe((res: HttpResponse<IUserRoleMapping[]>) => {
      this.userRoleMappings = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserRoleMappings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserRoleMapping): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserRoleMappings(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRoleMappingListModification', () => this.loadAll());
  }

  delete(userRoleMapping: IUserRoleMapping): void {
    const modalRef = this.modalService.open(UserRoleMappingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRoleMapping = userRoleMapping;
  }
}
