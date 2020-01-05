import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISignatureSetting } from 'app/shared/model/signature-setting.model';

type EntityResponseType = HttpResponse<ISignatureSetting>;
type EntityArrayResponseType = HttpResponse<ISignatureSetting[]>;

@Injectable({ providedIn: 'root' })
export class SignatureSettingService {
  public resourceUrl = SERVER_API_URL + 'api/signature-settings';

  constructor(protected http: HttpClient) {}

  create(signatureSetting: ISignatureSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(signatureSetting);
    return this.http
      .post<ISignatureSetting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(signatureSetting: ISignatureSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(signatureSetting);
    return this.http
      .put<ISignatureSetting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISignatureSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISignatureSetting[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(signatureSetting: ISignatureSetting): ISignatureSetting {
    const copy: ISignatureSetting = Object.assign({}, signatureSetting, {
      createdAt:
        signatureSetting.createdAt && signatureSetting.createdAt.isValid() ? signatureSetting.createdAt.format(DATE_FORMAT) : undefined,
      updatedAt:
        signatureSetting.updatedAt && signatureSetting.updatedAt.isValid() ? signatureSetting.updatedAt.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.updatedAt = res.body.updatedAt ? moment(res.body.updatedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((signatureSetting: ISignatureSetting) => {
        signatureSetting.createdAt = signatureSetting.createdAt ? moment(signatureSetting.createdAt) : undefined;
        signatureSetting.updatedAt = signatureSetting.updatedAt ? moment(signatureSetting.updatedAt) : undefined;
      });
    }
    return res;
  }
}
