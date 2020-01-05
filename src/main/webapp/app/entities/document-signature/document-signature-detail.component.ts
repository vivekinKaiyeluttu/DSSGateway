import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentSignature } from 'app/shared/model/document-signature.model';

@Component({
  selector: 'jhi-document-signature-detail',
  templateUrl: './document-signature-detail.component.html'
})
export class DocumentSignatureDetailComponent implements OnInit {
  documentSignature: IDocumentSignature | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentSignature }) => {
      this.documentSignature = documentSignature;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
