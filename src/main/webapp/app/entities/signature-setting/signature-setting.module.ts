import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { SignatureSettingComponent } from './signature-setting.component';
import { SignatureSettingDetailComponent } from './signature-setting-detail.component';
import { SignatureSettingUpdateComponent } from './signature-setting-update.component';
import { SignatureSettingDeleteDialogComponent } from './signature-setting-delete-dialog.component';
import { signatureSettingRoute } from './signature-setting.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(signatureSettingRoute)],
  declarations: [
    SignatureSettingComponent,
    SignatureSettingDetailComponent,
    SignatureSettingUpdateComponent,
    SignatureSettingDeleteDialogComponent
  ],
  entryComponents: [SignatureSettingDeleteDialogComponent]
})
export class DssGatewaySignatureSettingModule {}
