import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWorkFlowUser, WorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { WorkFlowUserService } from './work-flow-user.service';
import { IWorkFlow } from 'app/shared/model/work-flow.model';
import { WorkFlowService } from 'app/entities/work-flow/work-flow.service';
import { IUsers } from 'app/shared/model/users.model';
import { UsersService } from 'app/entities/users/users.service';

type SelectableEntity = IWorkFlow | IUsers;

@Component({
  selector: 'jhi-work-flow-user-update',
  templateUrl: './work-flow-user-update.component.html'
})
export class WorkFlowUserUpdateComponent implements OnInit {
  isSaving = false;

  workflows: IWorkFlow[] = [];

  users: IUsers[] = [];

  editForm = this.fb.group({
    id: [],
    step: [],
    workFlow: [],
    users: []
  });

  constructor(
    protected workFlowUserService: WorkFlowUserService,
    protected workFlowService: WorkFlowService,
    protected usersService: UsersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workFlowUser }) => {
      this.updateForm(workFlowUser);

      this.workFlowService
        .query()
        .pipe(
          map((res: HttpResponse<IWorkFlow[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IWorkFlow[]) => (this.workflows = resBody));

      this.usersService
        .query()
        .pipe(
          map((res: HttpResponse<IUsers[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUsers[]) => (this.users = resBody));
    });
  }

  updateForm(workFlowUser: IWorkFlowUser): void {
    this.editForm.patchValue({
      id: workFlowUser.id,
      step: workFlowUser.step,
      workFlow: workFlowUser.workFlow,
      users: workFlowUser.users
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workFlowUser = this.createFromForm();
    if (workFlowUser.id !== undefined) {
      this.subscribeToSaveResponse(this.workFlowUserService.update(workFlowUser));
    } else {
      this.subscribeToSaveResponse(this.workFlowUserService.create(workFlowUser));
    }
  }

  private createFromForm(): IWorkFlowUser {
    return {
      ...new WorkFlowUser(),
      id: this.editForm.get(['id'])!.value,
      step: this.editForm.get(['step'])!.value,
      workFlow: this.editForm.get(['workFlow'])!.value,
      users: this.editForm.get(['users'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkFlowUser>>): void {
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
