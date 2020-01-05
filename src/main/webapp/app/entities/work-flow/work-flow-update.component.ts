import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IWorkFlow, WorkFlow } from 'app/shared/model/work-flow.model';
import { WorkFlowService } from './work-flow.service';
import { IUsers } from 'app/shared/model/users.model';
import { UsersService } from 'app/entities/users/users.service';

@Component({
  selector: 'jhi-work-flow-update',
  templateUrl: './work-flow-update.component.html'
})
export class WorkFlowUpdateComponent implements OnInit {
  isSaving = false;

  users: IUsers[] = [];
  createdAtDp: any;
  updatedAtDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    status: [],
    createdAt: [],
    updatedAt: [],
    users: []
  });

  constructor(
    protected workFlowService: WorkFlowService,
    protected usersService: UsersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workFlow }) => {
      this.updateForm(workFlow);

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

  updateForm(workFlow: IWorkFlow): void {
    this.editForm.patchValue({
      id: workFlow.id,
      name: workFlow.name,
      status: workFlow.status,
      createdAt: workFlow.createdAt,
      updatedAt: workFlow.updatedAt,
      users: workFlow.users
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workFlow = this.createFromForm();
    if (workFlow.id !== undefined) {
      this.subscribeToSaveResponse(this.workFlowService.update(workFlow));
    } else {
      this.subscribeToSaveResponse(this.workFlowService.create(workFlow));
    }
  }

  private createFromForm(): IWorkFlow {
    return {
      ...new WorkFlow(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      status: this.editForm.get(['status'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updatedAt: this.editForm.get(['updatedAt'])!.value,
      users: this.editForm.get(['users'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkFlow>>): void {
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

  trackById(index: number, item: IUsers): any {
    return item.id;
  }
}
