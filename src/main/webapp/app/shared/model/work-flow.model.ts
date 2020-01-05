import { Moment } from 'moment';
import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { IDocument } from 'app/shared/model/document.model';
import { IUsers } from 'app/shared/model/users.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IWorkFlow {
  id?: number;
  name?: string;
  status?: Status;
  createdAt?: Moment;
  updatedAt?: Moment;
  workFlowUsers?: IWorkFlowUser[];
  documents?: IDocument[];
  users?: IUsers;
}

export class WorkFlow implements IWorkFlow {
  constructor(
    public id?: number,
    public name?: string,
    public status?: Status,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public workFlowUsers?: IWorkFlowUser[],
    public documents?: IDocument[],
    public users?: IUsers
  ) {}
}
