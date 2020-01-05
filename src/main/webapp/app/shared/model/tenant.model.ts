import { Moment } from 'moment';
import { IUsers } from 'app/shared/model/users.model';
import { IUserRole } from 'app/shared/model/user-role.model';

export interface ITenant {
  id?: number;
  name?: string;
  domain?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  organization?: string;
  createdBy?: string;
  createdAt?: Moment;
  updatedBy?: string;
  updatedAt?: Moment;
  users?: IUsers[];
  userRoles?: IUserRole[];
}

export class Tenant implements ITenant {
  constructor(
    public id?: number,
    public name?: string,
    public domain?: string,
    public primaryEmail?: string,
    public secondaryEmail?: string,
    public organization?: string,
    public createdBy?: string,
    public createdAt?: Moment,
    public updatedBy?: string,
    public updatedAt?: Moment,
    public users?: IUsers[],
    public userRoles?: IUserRole[]
  ) {}
}
