import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISignatureSetting, SignatureSetting } from 'app/shared/model/signature-setting.model';
import { SignatureSettingService } from './signature-setting.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUsers } from 'app/shared/model/users.model';
import { UsersService } from 'app/entities/users/users.service';

@Component({
  selector: 'jhi-signature-setting-update',
  templateUrl: './signature-setting-update.component.html'
})
export class SignatureSettingUpdateComponent implements OnInit {
  isSaving = false;

  users: IUsers[] = [];
  createdAtDp: any;
  updatedAtDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    signAs: [null, [Validators.required]],
    designation: [],
    image: [],
    imageContentType: [],
    defaultSignature: [],
    address: [],
    createdAt: [],
    updatedAt: [],
    users: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected signatureSettingService: SignatureSettingService,
    protected usersService: UsersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ signatureSetting }) => {
      this.updateForm(signatureSetting);

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

  updateForm(signatureSetting: ISignatureSetting): void {
    this.editForm.patchValue({
      id: signatureSetting.id,
      name: signatureSetting.name,
      signAs: signatureSetting.signAs,
      designation: signatureSetting.designation,
      image: signatureSetting.image,
      imageContentType: signatureSetting.imageContentType,
      defaultSignature: signatureSetting.defaultSignature,
      address: signatureSetting.address,
      createdAt: signatureSetting.createdAt,
      updatedAt: signatureSetting.updatedAt,
      users: signatureSetting.users
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('dssGatewayApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const signatureSetting = this.createFromForm();
    if (signatureSetting.id !== undefined) {
      this.subscribeToSaveResponse(this.signatureSettingService.update(signatureSetting));
    } else {
      this.subscribeToSaveResponse(this.signatureSettingService.create(signatureSetting));
    }
  }

  private createFromForm(): ISignatureSetting {
    return {
      ...new SignatureSetting(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      signAs: this.editForm.get(['signAs'])!.value,
      designation: this.editForm.get(['designation'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      defaultSignature: this.editForm.get(['defaultSignature'])!.value,
      address: this.editForm.get(['address'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      updatedAt: this.editForm.get(['updatedAt'])!.value,
      users: this.editForm.get(['users'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignatureSetting>>): void {
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
