import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { DocumentSignatureComponent } from './document-signature.component';
import { DocumentSignatureDetailComponent } from './document-signature-detail.component';
import { DocumentSignatureUpdateComponent } from './document-signature-update.component';
import { DocumentSignatureDeleteDialogComponent } from './document-signature-delete-dialog.component';
import { documentSignatureRoute } from './document-signature.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(documentSignatureRoute)],
  declarations: [
    DocumentSignatureComponent,
    DocumentSignatureDetailComponent,
    DocumentSignatureUpdateComponent,
    DocumentSignatureDeleteDialogComponent
  ],
  entryComponents: [DocumentSignatureDeleteDialogComponent]
})
export class DssGatewayDocumentSignatureModule {}
