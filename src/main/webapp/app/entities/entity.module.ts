import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tenant',
        loadChildren: () => import('./tenant/tenant.module').then(m => m.DssGatewayTenantModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.DssGatewayUsersModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission/permission.module').then(m => m.DssGatewayPermissionModule)
      },
      {
        path: 'role-permission-mapping',
        loadChildren: () =>
          import('./role-permission-mapping/role-permission-mapping.module').then(m => m.DssGatewayRolePermissionMappingModule)
      },
      {
        path: 'user-role',
        loadChildren: () => import('./user-role/user-role.module').then(m => m.DssGatewayUserRoleModule)
      },
      {
        path: 'user-role-mapping',
        loadChildren: () => import('./user-role-mapping/user-role-mapping.module').then(m => m.DssGatewayUserRoleMappingModule)
      },
      {
        path: 'signature-setting',
        loadChildren: () => import('./signature-setting/signature-setting.module').then(m => m.DssGatewaySignatureSettingModule)
      },
      {
        path: 'work-flow',
        loadChildren: () => import('./work-flow/work-flow.module').then(m => m.DssGatewayWorkFlowModule)
      },
      {
        path: 'work-flow-user',
        loadChildren: () => import('./work-flow-user/work-flow-user.module').then(m => m.DssGatewayWorkFlowUserModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.DssGatewayDocumentModule)
      },
      {
        path: 'document-signature',
        loadChildren: () => import('./document-signature/document-signature.module').then(m => m.DssGatewayDocumentSignatureModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DssGatewayEntityModule {}
