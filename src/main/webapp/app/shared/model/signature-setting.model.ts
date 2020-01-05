import { Moment } from 'moment';
import { IUsers } from 'app/shared/model/users.model';

export interface ISignatureSetting {
  id?: number;
  name?: string;
  signAs?: string;
  designation?: string;
  imageContentType?: string;
  image?: any;
  defaultSignature?: boolean;
  address?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  users?: IUsers;
}

export class SignatureSetting implements ISignatureSetting {
  constructor(
    public id?: number,
    public name?: string,
    public signAs?: string,
    public designation?: string,
    public imageContentType?: string,
    public image?: any,
    public defaultSignature?: boolean,
    public address?: string,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public users?: IUsers
  ) {
    this.defaultSignature = this.defaultSignature || false;
  }
}
