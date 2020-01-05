import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { TenantComponent } from './tenant.component';
import { TenantDetailComponent } from './tenant-detail.component';
import { TenantUpdateComponent } from './tenant-update.component';
import { TenantDeleteDialogComponent } from './tenant-delete-dialog.component';
import { tenantRoute } from './tenant.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(tenantRoute)],
  declarations: [TenantComponent, TenantDetailComponent, TenantUpdateComponent, TenantDeleteDialogComponent],
  entryComponents: [TenantDeleteDialogComponent]
})
export class DssGatewayTenantModule {}
