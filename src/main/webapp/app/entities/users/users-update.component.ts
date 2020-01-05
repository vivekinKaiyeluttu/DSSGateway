import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IUsers, Users } from 'app/shared/model/users.model';
import { UsersService } from './users.service';
import { ITenant } from 'app/shared/model/tenant.model';
import { TenantService } from 'app/entities/tenant/tenant.service';

@Component({
  selector: 'jhi-users-update',
  templateUrl: './users-update.component.html'
})
export class UsersUpdateComponent implements OnInit {
  isSaving = false;

  tenants: ITenant[] = [];
  createdAtDp: any;
  updatedAtDp: any;

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [],
    email: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@(.+)$')]],
    password: [null, [Validators.required]],
    verified: [],
    challengeToken: [],
    workFlowInitiate: [],
    createdBy: [],
    createdAt: [],
    updatedBy: [],
    updatedAt: [],
    tenant: []
  });

  constructor(
    protected usersService: UsersService,
    protected tenantService: TenantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ users }) => {
      this.updateForm(users);

      this.tenantService
        .query()
        .pipe(
          map((res: HttpResponse<ITenant[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITenant[]) => (this.tenants = resBody));
    });
  }

  updateForm(users: IUsers): void {
    this.editForm.patchValue({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      password: users.password,
      verified: users.verified,
      challengeToken: users.challengeToken,
      workFlowInitiate: users.workFlowInitiate,
      createdBy: users.createdBy,
      createdAt: users.createdAt,
      updatedBy: users.updatedBy,
      updatedAt: users.updatedAt,
      tenant: users.tenant
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const users = this.createFromForm();
    if (users.id !== undefined) {
      this.subscribeToSaveResponse(this.usersService.update(users));
    } else {
      this.subscribeToSaveResponse(this.usersService.create(users));
    }
  }

  private createFromForm(): IUsers {
    return {
      ...new Users(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      verified: this.editForm.get(['verified'])!.value,
      challengeToken: this.editForm.get(['challengeToken'])!.value,
      workFlowInitiate: this.editForm.get(['workFlowInitiate'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updatedBy: this.editForm.get(['updatedBy'])!.value,
      updatedAt: this.editForm.get(['updatedAt'])!.value,
      tenant: this.editForm.get(['tenant'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsers>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITenant): any {
    return item.id;
  }
}
