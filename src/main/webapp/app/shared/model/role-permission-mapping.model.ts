import { IUserRole } from 'app/shared/model/user-role.model';
import { IPermission } from 'app/shared/model/permission.model';

export interface IRolePermissionMapping {
  id?: number;
  userRole?: IUserRole;
  permission?: IPermission;
}

export class RolePermissionMapping implements IRolePermissionMapping {
  constructor(public id?: number, public userRole?: IUserRole, public permission?: IPermission) {}
}
