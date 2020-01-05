import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITenant } from 'app/shared/model/tenant.model';

type EntityResponseType = HttpResponse<ITenant>;
type EntityArrayResponseType = HttpResponse<ITenant[]>;

@Injectable({ providedIn: 'root' })
export class TenantService {
  public resourceUrl = SERVER_API_URL + 'api/tenants';

  constructor(protected http: HttpClient) {}

  create(tenant: ITenant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tenant);
    return this.http
      .post<ITenant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tenant: ITenant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tenant);
    return this.http
      .put<ITenant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITenant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITenant[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tenant: ITenant): ITenant {
    const copy: ITenant = Object.assign({}, tenant, {
      createdAt: tenant.createdAt && tenant.createdAt.isValid() ? tenant.createdAt.format(DATE_FORMAT) : undefined,
      updatedAt: tenant.updatedAt && tenant.updatedAt.isValid() ? tenant.updatedAt.format(DATE_FORMAT) : undefined
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
      res.body.forEach((tenant: ITenant) => {
        tenant.createdAt = tenant.createdAt ? moment(tenant.createdAt) : undefined;
        tenant.updatedAt = tenant.updatedAt ? moment(tenant.updatedAt) : undefined;
      });
    }
    return res;
  }
}
