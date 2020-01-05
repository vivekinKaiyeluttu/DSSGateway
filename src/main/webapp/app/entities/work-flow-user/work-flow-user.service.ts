import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';

type EntityResponseType = HttpResponse<IWorkFlowUser>;
type EntityArrayResponseType = HttpResponse<IWorkFlowUser[]>;

@Injectable({ providedIn: 'root' })
export class WorkFlowUserService {
  public resourceUrl = SERVER_API_URL + 'api/work-flow-users';

  constructor(protected http: HttpClient) {}

  create(workFlowUser: IWorkFlowUser): Observable<EntityResponseType> {
    return this.http.post<IWorkFlowUser>(this.resourceUrl, workFlowUser, { observe: 'response' });
  }

  update(workFlowUser: IWorkFlowUser): Observable<EntityResponseType> {
    return this.http.put<IWorkFlowUser>(this.resourceUrl, workFlowUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkFlowUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkFlowUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
