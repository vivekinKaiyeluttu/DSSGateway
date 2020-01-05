import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { RolePermissionMappingService } from './role-permission-mapping.service';
import { RolePermissionMappingDeleteDialogComponent } from './role-permission-mapping-delete-dialog.component';

@Component({
  selector: 'jhi-role-permission-mapping',
  templateUrl: './role-permission-mapping.component.html'
})
export class RolePermissionMappingComponent implements OnInit, OnDestroy {
  rolePermissionMappings?: IRolePermissionMapping[];
  eventSubscriber?: Subscription;

  constructor(
    protected rolePermissionMappingService: RolePermissionMappingService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.rolePermissionMappingService.query().subscribe((res: HttpResponse<IRolePermissionMapping[]>) => {
      this.rolePermissionMappings = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRolePermissionMappings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRolePermissionMapping): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRolePermissionMappings(): void {
    this.eventSubscriber = this.eventManager.subscribe('rolePermissionMappingListModification', () => this.loadAll());
  }

  delete(rolePermissionMapping: IRolePermissionMapping): void {
    const modalRef = this.modalService.open(RolePermissionMappingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rolePermissionMapping = rolePermissionMapping;
  }
}
