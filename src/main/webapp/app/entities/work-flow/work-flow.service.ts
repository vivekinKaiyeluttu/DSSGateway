import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkFlow } from 'app/shared/model/work-flow.model';

type EntityResponseType = HttpResponse<IWorkFlow>;
type EntityArrayResponseType = HttpResponse<IWorkFlow[]>;

@Injectable({ providedIn: 'root' })
export class WorkFlowService {
  public resourceUrl = SERVER_API_URL + 'api/work-flows';

  constructor(protected http: HttpClient) {}

  create(workFlow: IWorkFlow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workFlow);
    return this.http
      .post<IWorkFlow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(workFlow: IWorkFlow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workFlow);
    return this.http
      .put<IWorkFlow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWorkFlow>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWorkFlow[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(workFlow: IWorkFlow): IWorkFlow {
    const copy: IWorkFlow = Object.assign({}, workFlow, {
      createdAt: workFlow.createdAt && workFlow.createdAt.isValid() ? workFlow.createdAt.format(DATE_FORMAT) : undefined,
      updatedAt: workFlow.updatedAt && workFlow.updatedAt.isValid() ? workFlow.updatedAt.format(DATE_FORMAT) : undefined
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
      res.body.forEach((workFlow: IWorkFlow) => {
        workFlow.createdAt = workFlow.createdAt ? moment(workFlow.createdAt) : undefined;
        workFlow.updatedAt = workFlow.updatedAt ? moment(workFlow.updatedAt) : undefined;
      });
    }
    return res;
  }
}
