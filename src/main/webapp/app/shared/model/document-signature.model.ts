import { Moment } from 'moment';
import { IDocument } from 'app/shared/model/document.model';
import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';

export interface IDocumentSignature {
  id?: number;
  validFrom?: Moment;
  validTo?: Moment;
  deviceId?: number;
  signature?: string;
  createdAt?: Moment;
  document?: IDocument;
  workFlowUser?: IWorkFlowUser;
}

export class DocumentSignature implements IDocumentSignature {
  constructor(
    public id?: number,
    public validFrom?: Moment,
    public validTo?: Moment,
    public deviceId?: number,
    public signature?: string,
    public createdAt?: Moment,
    public document?: IDocument,
    public workFlowUser?: IWorkFlowUser
  ) {}
}
