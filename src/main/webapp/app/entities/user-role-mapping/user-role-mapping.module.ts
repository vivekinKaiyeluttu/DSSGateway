import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { UserRoleMappingComponent } from './user-role-mapping.component';
import { UserRoleMappingDetailComponent } from './user-role-mapping-detail.component';
import { UserRoleMappingUpdateComponent } from './user-role-mapping-update.component';
import { UserRoleMappingDeleteDialogComponent } from './user-role-mapping-delete-dialog.component';
import { userRoleMappingRoute } from './user-role-mapping.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(userRoleMappingRoute)],
  declarations: [
    UserRoleMappingComponent,
    UserRoleMappingDetailComponent,
    UserRoleMappingUpdateComponent,
    UserRoleMappingDeleteDialogComponent
  ],
  entryComponents: [UserRoleMappingDeleteDialogComponent]
})
export class DssGatewayUserRoleMappingModule {}
