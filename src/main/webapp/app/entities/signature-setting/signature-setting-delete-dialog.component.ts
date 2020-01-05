import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISignatureSetting } from 'app/shared/model/signature-setting.model';
import { SignatureSettingService } from './signature-setting.service';

@Component({
  templateUrl: './signature-setting-delete-dialog.component.html'
})
export class SignatureSettingDeleteDialogComponent {
  signatureSetting?: ISignatureSetting;

  constructor(
    protected signatureSettingService: SignatureSettingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.signatureSettingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('signatureSettingListModification');
      this.activeModal.close();
    });
  }
}
