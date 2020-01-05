import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISignatureSetting } from 'app/shared/model/signature-setting.model';

@Component({
  selector: 'jhi-signature-setting-detail',
  templateUrl: './signature-setting-detail.component.html'
})
export class SignatureSettingDetailComponent implements OnInit {
  signatureSetting: ISignatureSetting | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ signatureSetting }) => {
      this.signatureSetting = signatureSetting;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
