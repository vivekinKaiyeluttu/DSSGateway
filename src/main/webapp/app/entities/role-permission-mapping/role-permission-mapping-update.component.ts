import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRolePermissionMapping, RolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { RolePermissionMappingService } from './role-permission-mapping.service';
import { IUserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from 'app/entities/user-role/user-role.service';
import { IPermission } from 'app/shared/model/permission.model';
import { PermissionService } from 'app/entities/permission/permission.service';

type SelectableEntity = IUserRole | IPermission;

@Component({
  selector: 'jhi-role-permission-mapping-update',
  templateUrl: './role-permission-mapping-update.component.html'
})
export class RolePermissionMappingUpdateComponent implements OnInit {
  isSaving = false;

  userroles: IUserRole[] = [];

  permissions: IPermission[] = [];

  editForm = this.fb.group({
    id: [],
    userRole: [],
    permission: []
  });

  constructor(
    protected rolePermissionMappingService: RolePermissionMappingService,
    protected userRoleService: UserRoleService,
    protected permissionService: PermissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolePermissionMapping }) => {
      this.updateForm(rolePermissionMapping);

      this.userRoleService
        .query()
        .pipe(
          map((res: HttpResponse<IUserRole[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUserRole[]) => (this.userroles = resBody));

      this.permissionService
        .query()
        .pipe(
          map((res: HttpResponse<IPermission[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPermission[]) => (this.permissions = resBody));
    });
  }

  updateForm(rolePermissionMapping: IRolePermissionMapping): void {
    this.editForm.patchValue({
      id: rolePermissionMapping.id,
      userRole: rolePermissionMapping.userRole,
      permission: rolePermissionMapping.permission
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rolePermissionMapping = this.createFromForm();
    if (rolePermissionMapping.id !== undefined) {
      this.subscribeToSaveResponse(this.rolePermissionMappingService.update(rolePermissionMapping));
    } else {
      this.subscribeToSaveResponse(this.rolePermissionMappingService.create(rolePermissionMapping));
    }
  }

  private createFromForm(): IRolePermissionMapping {
    return {
      ...new RolePermissionMapping(),
      id: this.editForm.get(['id'])!.value,
      userRole: this.editForm.get(['userRole'])!.value,
      permission: this.editForm.get(['permission'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolePermissionMapping>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
