import { Moment } from 'moment';
import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { ISignatureSetting } from 'app/shared/model/signature-setting.model';
import { IWorkFlow } from 'app/shared/model/work-flow.model';
import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { ITenant } from 'app/shared/model/tenant.model';

export interface IUsers {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  challengeToken?: string;
  workFlowInitiate?: boolean;
  createdBy?: string;
  createdAt?: Moment;
  updatedBy?: string;
  updatedAt?: Moment;
  userRoleMappings?: IUserRoleMapping[];
  signatureSettings?: ISignatureSetting[];
  workFlows?: IWorkFlow[];
  workFlowUsers?: IWorkFlowUser[];
  tenant?: ITenant;
}

export class Users implements IUsers {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public verified?: boolean,
    public challengeToken?: string,
    public workFlowInitiate?: boolean,
    public createdBy?: string,
    public createdAt?: Moment,
    public updatedBy?: string,
    public updatedAt?: Moment,
    public userRoleMappings?: IUserRoleMapping[],
    public signatureSettings?: ISignatureSetting[],
    public workFlows?: IWorkFlow[],
    public workFlowUsers?: IWorkFlowUser[],
    public tenant?: ITenant
  ) {
    this.verified = this.verified || false;
    this.workFlowInitiate = this.workFlowInitiate || false;
  }
}
