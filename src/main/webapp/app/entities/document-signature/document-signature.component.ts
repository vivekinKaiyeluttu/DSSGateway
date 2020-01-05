import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentSignature } from 'app/shared/model/document-signature.model';
import { DocumentSignatureService } from './document-signature.service';
import { DocumentSignatureDeleteDialogComponent } from './document-signature-delete-dialog.component';

@Component({
  selector: 'jhi-document-signature',
  templateUrl: './document-signature.component.html'
})
export class DocumentSignatureComponent implements OnInit, OnDestroy {
  documentSignatures?: IDocumentSignature[];
  eventSubscriber?: Subscription;

  constructor(
    protected documentSignatureService: DocumentSignatureService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.documentSignatureService.query().subscribe((res: HttpResponse<IDocumentSignature[]>) => {
      this.documentSignatures = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocumentSignatures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocumentSignature): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocumentSignatures(): void {
    this.eventSubscriber = this.eventManager.subscribe('documentSignatureListModification', () => this.loadAll());
  }

  delete(documentSignature: IDocumentSignature): void {
    const modalRef = this.modalService.open(DocumentSignatureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentSignature = documentSignature;
  }
}
