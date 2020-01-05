import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentSignature } from 'app/shared/model/document-signature.model';
import { DocumentSignatureService } from './document-signature.service';

@Component({
  templateUrl: './document-signature-delete-dialog.component.html'
})
export class DocumentSignatureDeleteDialogComponent {
  documentSignature?: IDocumentSignature;

  constructor(
    protected documentSignatureService: DocumentSignatureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentSignatureService.delete(id).subscribe(() => {
      this.eventManager.broadcast('documentSignatureListModification');
      this.activeModal.close();
    });
  }
}
