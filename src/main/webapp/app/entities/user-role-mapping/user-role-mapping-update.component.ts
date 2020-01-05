import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserRoleMapping, UserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { UserRoleMappingService } from './user-role-mapping.service';
import { IUsers } from 'app/shared/model/users.model';
import { UsersService } from 'app/entities/users/users.service';
import { IUserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from 'app/entities/user-role/user-role.service';

type SelectableEntity = IUsers | IUserRole;

@Component({
  selector: 'jhi-user-role-mapping-update',
  templateUrl: './user-role-mapping-update.component.html'
})
export class UserRoleMappingUpdateComponent implements OnInit {
  isSaving = false;

  users: IUsers[] = [];

  userroles: IUserRole[] = [];

  editForm = this.fb.group({
    id: [],
    users: [],
    userRole: []
  });

  constructor(
    protected userRoleMappingService: UserRoleMappingService,
    protected usersService: UsersService,
    protected userRoleService: UserRoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRoleMapping }) => {
      this.updateForm(userRoleMapping);

      this.usersService
        .query()
        .pipe(
          map((res: HttpResponse<IUsers[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUsers[]) => (this.users = resBody));

      this.userRoleService
        .query()
        .pipe(
          map((res: HttpResponse<IUserRole[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUserRole[]) => (this.userroles = resBody));
    });
  }

  updateForm(userRoleMapping: IUserRoleMapping): void {
    this.editForm.patchValue({
      id: userRoleMapping.id,
      users: userRoleMapping.users,
      userRole: userRoleMapping.userRole
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userRoleMapping = this.createFromForm();
    if (userRoleMapping.id !== undefined) {
      this.subscribeToSaveResponse(this.userRoleMappingService.update(userRoleMapping));
    } else {
      this.subscribeToSaveResponse(this.userRoleMappingService.create(userRoleMapping));
    }
  }

  private createFromForm(): IUserRoleMapping {
    return {
      ...new UserRoleMapping(),
      id: this.editForm.get(['id'])!.value,
      users: this.editForm.get(['users'])!.value,
      userRole: this.editForm.get(['userRole'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRoleMapping>>): void {
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
