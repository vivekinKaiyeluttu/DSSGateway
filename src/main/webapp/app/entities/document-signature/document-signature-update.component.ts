import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IDocumentSignature, DocumentSignature } from 'app/shared/model/document-signature.model';
import { DocumentSignatureService } from './document-signature.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';
import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { WorkFlowUserService } from 'app/entities/work-flow-user/work-flow-user.service';

type SelectableEntity = IDocument | IWorkFlowUser;

@Component({
  selector: 'jhi-document-signature-update',
  templateUrl: './document-signature-update.component.html'
})
export class DocumentSignatureUpdateComponent implements OnInit {
  isSaving = false;

  documents: IDocument[] = [];

  workflowusers: IWorkFlowUser[] = [];
  validFromDp: any;
  validToDp: any;
  createdAtDp: any;

  editForm = this.fb.group({
    id: [],
    validFrom: [],
    validTo: [],
    deviceId: [],
    signature: [],
    createdAt: [],
    document: [],
    workFlowUser: []
  });

  constructor(
    protected documentSignatureService: DocumentSignatureService,
    protected documentService: DocumentService,
    protected workFlowUserService: WorkFlowUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentSignature }) => {
      this.updateForm(documentSignature);

      this.documentService
        .query()
        .pipe(
          map((res: HttpResponse<IDocument[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDocument[]) => (this.documents = resBody));

      this.workFlowUserService
        .query()
        .pipe(
          map((res: HttpResponse<IWorkFlowUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IWorkFlowUser[]) => (this.workflowusers = resBody));
    });
  }

  updateForm(documentSignature: IDocumentSignature): void {
    this.editForm.patchValue({
      id: documentSignature.id,
      validFrom: documentSignature.validFrom,
      validTo: documentSignature.validTo,
      deviceId: documentSignature.deviceId,
      signature: documentSignature.signature,
      createdAt: documentSignature.createdAt,
      document: documentSignature.document,
      workFlowUser: documentSignature.workFlowUser
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentSignature = this.createFromForm();
    if (documentSignature.id !== undefined) {
      this.subscribeToSaveResponse(this.documentSignatureService.update(documentSignature));
    } else {
      this.subscribeToSaveResponse(this.documentSignatureService.create(documentSignature));
    }
  }

  private createFromForm(): IDocumentSignature {
    return {
      ...new DocumentSignature(),
      id: this.editForm.get(['id'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value,
      validTo: this.editForm.get(['validTo'])!.value,
      deviceId: this.editForm.get(['deviceId'])!.value,
      signature: this.editForm.get(['signature'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value,
      document: this.editForm.get(['document'])!.value,
      workFlowUser: this.editForm.get(['workFlowUser'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentSignature>>): void {
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
