import { IDocumentSignature } from 'app/shared/model/document-signature.model';
import { IWorkFlow } from 'app/shared/model/work-flow.model';
import { IUsers } from 'app/shared/model/users.model';

export interface IWorkFlowUser {
  id?: number;
  step?: number;
  documentSignatures?: IDocumentSignature[];
  workFlow?: IWorkFlow;
  users?: IUsers;
}

export class WorkFlowUser implements IWorkFlowUser {
  constructor(
    public id?: number,
    public step?: number,
    public documentSignatures?: IDocumentSignature[],
    public workFlow?: IWorkFlow,
    public users?: IUsers
  ) {}
}
