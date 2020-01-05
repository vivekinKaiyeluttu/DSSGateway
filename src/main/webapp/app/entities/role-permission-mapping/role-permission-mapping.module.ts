import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { RolePermissionMappingComponent } from './role-permission-mapping.component';
import { RolePermissionMappingDetailComponent } from './role-permission-mapping-detail.component';
import { RolePermissionMappingUpdateComponent } from './role-permission-mapping-update.component';
import { RolePermissionMappingDeleteDialogComponent } from './role-permission-mapping-delete-dialog.component';
import { rolePermissionMappingRoute } from './role-permission-mapping.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(rolePermissionMappingRoute)],
  declarations: [
    RolePermissionMappingComponent,
    RolePermissionMappingDetailComponent,
    RolePermissionMappingUpdateComponent,
    RolePermissionMappingDeleteDialogComponent
  ],
  entryComponents: [RolePermissionMappingDeleteDialogComponent]
})
export class DssGatewayRolePermissionMappingModule {}
