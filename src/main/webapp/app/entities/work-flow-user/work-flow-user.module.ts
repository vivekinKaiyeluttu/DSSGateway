import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { WorkFlowUserComponent } from './work-flow-user.component';
import { WorkFlowUserDetailComponent } from './work-flow-user-detail.component';
import { WorkFlowUserUpdateComponent } from './work-flow-user-update.component';
import { WorkFlowUserDeleteDialogComponent } from './work-flow-user-delete-dialog.component';
import { workFlowUserRoute } from './work-flow-user.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(workFlowUserRoute)],
  declarations: [WorkFlowUserComponent, WorkFlowUserDetailComponent, WorkFlowUserUpdateComponent, WorkFlowUserDeleteDialogComponent],
  entryComponents: [WorkFlowUserDeleteDialogComponent]
})
export class DssGatewayWorkFlowUserModule {}
