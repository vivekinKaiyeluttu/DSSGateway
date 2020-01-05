import { IUsers } from 'app/shared/model/users.model';
import { IUserRole } from 'app/shared/model/user-role.model';

export interface IUserRoleMapping {
  id?: number;
  users?: IUsers;
  userRole?: IUserRole;
}

export class UserRoleMapping implements IUserRoleMapping {
  constructor(public id?: number, public users?: IUsers, public userRole?: IUserRole) {}
}
