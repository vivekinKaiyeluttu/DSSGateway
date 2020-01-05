import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsers } from 'app/shared/model/users.model';
import { UsersService } from './users.service';
import { UsersDeleteDialogComponent } from './users-delete-dialog.component';

@Component({
  selector: 'jhi-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  users?: IUsers[];
  eventSubscriber?: Subscription;

  constructor(protected usersService: UsersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.usersService.query().subscribe((res: HttpResponse<IUsers[]>) => {
      this.users = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUsers): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('usersListModification', () => this.loadAll());
  }

  delete(users: IUsers): void {
    const modalRef = this.modalService.open(UsersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.users = users;
  }
}
