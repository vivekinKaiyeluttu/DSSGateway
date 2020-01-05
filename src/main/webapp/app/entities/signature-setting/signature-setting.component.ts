import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISignatureSetting } from 'app/shared/model/signature-setting.model';
import { SignatureSettingService } from './signature-setting.service';
import { SignatureSettingDeleteDialogComponent } from './signature-setting-delete-dialog.component';

@Component({
  selector: 'jhi-signature-setting',
  templateUrl: './signature-setting.component.html'
})
export class SignatureSettingComponent implements OnInit, OnDestroy {
  signatureSettings?: ISignatureSetting[];
  eventSubscriber?: Subscription;

  constructor(
    protected signatureSettingService: SignatureSettingService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.signatureSettingService.query().subscribe((res: HttpResponse<ISignatureSetting[]>) => {
      this.signatureSettings = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSignatureSettings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISignatureSetting): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSignatureSettings(): void {
    this.eventSubscriber = this.eventManager.subscribe('signatureSettingListModification', () => this.loadAll());
  }

  delete(signatureSetting: ISignatureSetting): void {
    const modalRef = this.modalService.open(SignatureSettingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.signatureSetting = signatureSetting;
  }
}
