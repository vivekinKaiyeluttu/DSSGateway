import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ITenant, Tenant } from 'app/shared/model/tenant.model';
import { TenantService } from './tenant.service';

@Component({
  selector: 'jhi-tenant-update',
  templateUrl: './tenant-update.component.html'
})
export class TenantUpdateComponent implements OnInit {
  isSaving = false;
  createdAtDp: any;
  updatedAtDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    domain: [],
    primaryEmail: [null, [Validators.required]],
    secondaryEmail: [],
    organization: [null, [Validators.required]],
    createdBy: [],
    createdAt: [],
    updatedBy: [],
    updatedAt: []
  });

  constructor(protected tenantService: TenantService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tenant }) => {
      this.updateForm(tenant);
    });
  }

  updateForm(tenant: ITenant): void {
    this.editForm.patchValue({
      id: tenant.id,
      name: tenant.name,
      domain: tenant.domain,
      primaryEmail: tenant.primaryEmail,
      secondaryEmail: tenant.secondaryEmail,
      organization: tenant.organization,
      createdBy: tenant.createdBy,
      createdAt: tenant.createdAt,
      updatedBy: tenant.updatedBy,
      updatedAt: tenant.updatedAt
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tenant = this.createFromForm();
    if (tenant.id !== undefined) {
      this.subscribeToSaveResponse(this.tenantService.update(tenant));
    } else {
      this.subscribeToSaveResponse(this.tenantService.create(tenant));
    }
  }

  private createFromForm(): ITenant {
    return {
      ...new Tenant(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      domain: this.editForm.get(['domain'])!.value,
      primaryEmail: this.editForm.get(['primaryEmail'])!.value,
      secondaryEmail: this.editForm.get(['secondaryEmail'])!.value,
      organization: this.editForm.get(['organization'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updatedBy: this.editForm.get(['updatedBy'])!.value,
      updatedAt: this.editForm.get(['updatedAt'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITenant>>): void {
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
}
