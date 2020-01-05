import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowDetailComponent } from './work-flow-detail.component';
import { WorkFlowUpdateComponent } from './work-flow-update.component';
import { WorkFlowDeleteDialogComponent } from './work-flow-delete-dialog.component';
import { workFlowRoute } from './work-flow.route';

@NgModule({
  imports: [DssGatewaySharedModule, RouterModule.forChild(workFlowRoute)],
  declarations: [WorkFlowComponent, WorkFlowDetailComponent, WorkFlowUpdateComponent, WorkFlowDeleteDialogComponent],
  entryComponents: [WorkFlowDeleteDialogComponent]
})
export class DssGatewayWorkFlowModule {}
