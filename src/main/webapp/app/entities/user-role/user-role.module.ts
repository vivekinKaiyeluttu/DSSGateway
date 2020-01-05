import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { UserRoleComponent } from './user-role.component';
import { UserRoleDetailComponent } from './user-role-detail.component';
import { UserRoleUpdateComponent } from './user-role-update.component';
import { UserRoleDeleteDialogComponent } from './user-role-delete-dialog.component';
import { userRoleRoute } from './user-role.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(userRoleRoute)],
  declarations: [UserRoleComponent, UserRoleDetailComponent, UserRoleUpdateComponent, UserRoleDeleteDialogComponent],
  entryComponents: [UserRoleDeleteDialogComponent]
})
export class DssGatewayUserRoleModule {}
