import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { Permissions } from 'app/shared/model/enumerations/permissions.model';

export interface IPermission {
  id?: number;
  name?: Permissions;
  rolePermissionMappings?: IRolePermissionMapping[];
}

export class Permission implements IPermission {
  constructor(public id?: number, public name?: Permissions, public rolePermissionMappings?: IRolePermissionMapping[]) {}
}
