import { Moment } from 'moment';
import { IDocumentSignature } from 'app/shared/model/document-signature.model';
import { IWorkFlow } from 'app/shared/model/work-flow.model';

export interface IDocument {
  id?: number;
  fileName?: string;
  messageDigest?: string;
  fileContentType?: string;
  file?: any;
  expireAt?: Moment;
  createdAt?: Moment;
  documentSignatures?: IDocumentSignature[];
  workFlow?: IWorkFlow;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public fileName?: string,
    public messageDigest?: string,
    public fileContentType?: string,
    public file?: any,
    public expireAt?: Moment,
    public createdAt?: Moment,
    public documentSignatures?: IDocumentSignature[],
    public workFlow?: IWorkFlow
  ) {}
}
