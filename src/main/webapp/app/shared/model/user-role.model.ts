import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { ITenant } from 'app/shared/model/tenant.model';

export interface IUserRole {
  id?: number;
  name?: string;
  rolePermissionMappings?: IRolePermissionMapping[];
  userRoleMappings?: IUserRoleMapping[];
  tenant?: ITenant;
}

export class UserRole implements IUserRole {
  constructor(
    public id?: number,
    public name?: string,
    public rolePermissionMappings?: IRolePermissionMapping[],
    public userRoleMappings?: IUserRoleMapping[],
    public tenant?: ITenant
  ) {}
}
